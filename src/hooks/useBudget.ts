import { useState, useEffect } from "react"
import { mockBudgetStats } from '../data'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createIncome, getBudgetStats, getIncomes } from "../services/budget.service"
import { Income } from "../models"
import { AppStore } from "../redux/store"
import { useSelector } from "react-redux"
import { dialogCloseSubject$ } from "../components"
import { updateBudgetStats } from "../utils"

export const useBudget = () => {

    const queryClient = useQueryClient()
    const [stats, setStats] = useState(mockBudgetStats)
    const stateBudget = useSelector((store: AppStore) => store.budget)
    const incomeItems = stateBudget.items

    const { data: statsData } = useQuery({
        queryKey: ['stats'],
        queryFn: getBudgetStats,
        enabled: true
    })

    useEffect(() => {
        if (statsData) {
            console.log('statsData called:', statsData, updateBudgetStats(mockBudgetStats, statsData))
            setStats(updateBudgetStats(mockBudgetStats, statsData))
        }
    }, [statsData])

    const createIncomeMutation = useMutation({
        mutationFn: (income: Income) => createIncome(income),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incomes'] })
            // close dialog
            dialogCloseSubject$.setSubject = true;
        },
        onError: () => alert('Error creating item'),
    })

    const getQueryIncomes = useQuery({
        queryKey: ['incomes'],
        queryFn: getIncomes,
        enabled: true
    })

    useEffect(() => {
        if (getQueryIncomes.isSuccess && getQueryIncomes.data) {
            console.log('getIncomes called:', getQueryIncomes.data)
        }
    }, [getQueryIncomes.isSuccess, getQueryIncomes.data])

    return {
        stats: stats,
        incomes: incomeItems,
        createIncomeMutation: createIncomeMutation,
        getQueryIncomes: getQueryIncomes,
    }
}