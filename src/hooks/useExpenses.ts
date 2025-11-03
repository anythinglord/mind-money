import { useState, useEffect } from "react"
import { Item, ItemCreated, Section, ItemToModify } from '../models'
import { useDispatch, useSelector } from "react-redux"
import { dialogCloseSubject$ } from "../components"
import { useAppDispatch } from "./useDispatch"
import { AppStore } from "../redux/store"
import { saveExpense, setExpenses, updateStats, changeMode } from "../redux/states"
import { useMutation } from "@tanstack/react-query"
import { getExpenses, getExpenseStats, createExpense, editExpense } from "../services"
import { filterItemsByCategory, filterItemsBySearchName, getIndex, replaceItemByIndex } from "../utils"
import { mockExpenseStats } from "../data"
import { adaptExpense } from "../services/adapters/expenseAdapter"
import { Stats, CreateExpenseResponse } from "../models/api/CreateExpenseResponse"

export const useExpenses = () => {

    const stateCategory = useSelector((store: AppStore) => store.category)
    const filterCategoryName = stateCategory.filterName
    const searchName = stateCategory.searchName
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const expenseItems = stateExpenses.items
    const expenseStats = stateExpenses.stats

    const [items, setItems] = useState<Item[]>(expenseItems)
    const [stats, setStats] = useState<Section[]>(mockExpenseStats)
    const dispatch = useDispatch()
    const dispatchAsync = useAppDispatch()

    useEffect(() => {
        // update table expenses after update the store
        setItems(expenseItems)
    }, [expenseItems])

    useEffect(() => {
        // update card`s stats after update the store
        setStats(expenseStats)
    }, [expenseStats])

    const updateItem = (itemModified: Item) => {
        const index = getIndex(expenseItems, itemModified)
        const expensesUpdated = replaceItemByIndex(expenseItems, index, itemModified)
        dispatch(setExpenses(expensesUpdated))
        setItems(expensesUpdated)
    }

    const createLocalExpense = (data: ItemCreated, stats: Stats) => {
        const newItem = adaptExpense(data)
        dispatchAsync(saveExpense({ item: newItem, currentItems: expenseItems, stats: stats }))
    }

    const getExpensesMutation = useMutation({
        mutationFn: () => getExpenses(),
        onSuccess: (response) => {
            const { expenses } = response
            dispatch(setExpenses(expenses))
        },
        onError: () => console.log('error load expenses')
    })

    const getExpensesStatsMutation = useMutation({
        mutationFn: (category: string) => getExpenseStats(category),
        onSuccess: (response) => {
            dispatchAsync(updateStats({ stats: response }))
        },
        onError: () => console.log('error load expenses')
    })

    const createExpenseMutation = useMutation({
        mutationFn: (expense: ItemCreated) => createExpense(expense),
        onSuccess: (response: CreateExpenseResponse) => {
            const { data } = response
            createLocalExpense(data.item, data.stats)
            // close dialog
            dialogCloseSubject$.setSubject = true;
        },
        onError: () => alert('Error creating item'),
    })

    const modifyExpenseMutation = useMutation({
        mutationFn: (expense: ItemToModify) => editExpense(expense),
        onSuccess: (item: Item) => {
            updateItem(item)
            // close dialog
            dialogCloseSubject$.setSubject = true;
            // change mode to none
            dispatch(changeMode('none'))
        },
        onError: () => alert('Error modifing item'),
    })

    useEffect(() => {
        getExpensesMutation.mutate()
        getExpensesStatsMutation.mutate('')
    }, [])

    useEffect(() => {
        if (searchName !== '') {
            const itemsFilteredByCategory = filterItemsByCategory(expenseItems, filterCategoryName)
            const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
            setItems(itemsFilteredBySearchName)
        } else {
            const filteredItems = filterItemsByCategory(expenseItems, filterCategoryName)
            setItems(filteredItems)
        }
    }, [searchName])


    // used to filter all expense by category name
    useEffect(() => {
        if (filterCategoryName === 'All categories') {
            const itemsFilteredBySearchName = filterItemsBySearchName(expenseItems, searchName)
            setItems(itemsFilteredBySearchName)
            getExpensesStatsMutation.mutate('')
        } else {
            if (filterCategoryName) {
                const itemsFilteredByCategory = filterItemsByCategory(expenseItems, filterCategoryName)
                const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
                setItems(itemsFilteredBySearchName)
                getExpensesStatsMutation.mutate(filterCategoryName)
            }
        }
    }, [filterCategoryName])

    return {
        expenses: items,
        stats: stats,
        createLocalExpense: createLocalExpense,
        updateItem: updateItem,
        createExpenseMutation: createExpenseMutation,
        modifyExpenseMutation: modifyExpenseMutation
    }
}