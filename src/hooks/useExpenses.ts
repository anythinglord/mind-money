import { useState, useEffect } from "react"
import { Item, ItemCreated, Type } from '../models'
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "../redux/store"
import { addExpense, setExpenses } from "../redux/states"
import { useMutation } from "@tanstack/react-query"
import { getExpenses, getExpenseStats } from "../services"
import { filterItemsByCategory, filterItemsBySearchName, getIndex, replaceItemByIndex } from "../utils"
import { ExpensesStats } from "../data"

export const useExpenses = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const filterCategoryName = stateCategory.filterName
    const searchName = stateCategory.searchName
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const expenseItems = stateExpenses.items
    
    const [items, setItems] = useState<Item[]>(expenseItems)
    const [stats, setStats] = useState(ExpensesStats)
    const dispatch = useDispatch()
    
    const updateItem = (itemModified: Item) => {
        const index = getIndex(expenseItems, itemModified)
        const expensesUpdated = replaceItemByIndex(expenseItems, index, itemModified)
        dispatch(setExpenses(expensesUpdated))
        setItems(expensesUpdated)
    }

    const createNewItem = (data: ItemCreated) => {
        const { name, amount, category, createdAt } = data;
        const newItem: Item = { 
            createdAt: createdAt,
            name: name,
            category: category,
            type:  Type.Expenses,
            amount: amount 
        }
        dispatch(addExpense(newItem))
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
        mutationFn: () => getExpenseStats(),
        onSuccess: (response) => {
            const { highestCategory, total, totalCurrentMonth } = response
            setStats(prevStats => {
                const newStats = [...prevStats]
                newStats[0]['value'] = total
                newStats[1]['value'] = highestCategory
                newStats[2]['value'] = totalCurrentMonth
                return newStats
            })
        },
        onError: () => console.log('error load expenses')
    })

    useEffect(() => {
        getExpensesMutation.mutate()
        getExpensesStatsMutation.mutate()
    },[])

    useEffect(()=>{
        if (searchName !== '') {
            const itemsFilteredByCategory = filterItemsByCategory(expenseItems, filterCategoryName)
            const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
            setItems(itemsFilteredBySearchName)
        } else {
            const filteredItems = filterItemsByCategory(expenseItems, filterCategoryName)
            setItems(filteredItems)
        }
    },[searchName])


    // used to filter all expense by category name
    useEffect(()=>{
        if (filterCategoryName === 'All categories') {
            const itemsFilteredBySearchName = filterItemsBySearchName(expenseItems, searchName)
            setItems(itemsFilteredBySearchName)
        } else {
            if (filterCategoryName) {
                const itemsFilteredByCategory = filterItemsByCategory(expenseItems, filterCategoryName)
                const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
                setItems(itemsFilteredBySearchName)
            }
        }
    },[filterCategoryName])

    return {
        expenses: items,
        stats: stats, 
        createItem: createNewItem,
        updateItem: updateItem
    }
}