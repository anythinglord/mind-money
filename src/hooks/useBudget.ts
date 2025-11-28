import { useState } from "react"
import { mockBudgetStats } from '../data'
import { useMutation } from "@tanstack/react-query"
import { createIncome } from "../services/budget.service"
import { BudgetStats, Income } from "../models"
import { CreateIncomeResponse } from "../models"
import { AppStore } from "../redux/store"
import { adaptIncome } from "../services/adapters/incomeAdapter"
import { useAppDispatch } from "./useDispatch"
import { saveIncome } from "../redux/states/budget"
import { useSelector } from "react-redux"
import { dialogCloseSubject$ } from "../components"

export const useBudget = () => {
    const [stats, _] = useState(mockBudgetStats)
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const expenseItems = stateExpenses.items
    const dispatchAsync = useAppDispatch()

    const createLocalIncome = (data: Income, stats: BudgetStats) => {
        const newItem = adaptIncome(data)
        dispatchAsync(saveIncome({ item: newItem, currentItems: expenseItems, stats: stats }))
    }

    const createIncomeMutation = useMutation({
        mutationFn: (income: Income) => createIncome(income),
        onSuccess: (response: CreateIncomeResponse) => {
            const { data } = response
            createLocalIncome(data.item, data.stats)
            // close dialog
            dialogCloseSubject$.setSubject = true;
        },
        onError: () => alert('Error creating item'),
    })

    return {
        stats: stats,
        createIncomeMutation: createIncomeMutation
    }
}