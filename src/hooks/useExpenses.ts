import { useState, useEffect } from "react"
import { Item, ItemCreated, Type } from '../models'
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "../redux/store"
import { addExpense, setExpenses } from "../redux/states"
import { useMutation } from "@tanstack/react-query"
import { getExpenses } from "../services"
import { filterItemsByCategory, filterItemsBySearchName } from "../utils"

export const useExpenses = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const categoryName = stateCategory.name;
    const searchName = stateCategory.searchName
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const expenseItems = stateExpenses.items

    const [items, setItems] = useState<Item[]>(expenseItems)
    const dispatch = useDispatch()
    
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

    useEffect(() => {
        getExpensesMutation.mutate()
    },[])

    useEffect(()=>{
        if (searchName !== '') {
            const itemsFilteredByCategory = filterItemsByCategory(expenseItems, categoryName)
            const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
            setItems(itemsFilteredBySearchName)
        } else {
            const filteredItems = filterItemsByCategory(expenseItems, categoryName)
            setItems(filteredItems)
        }
    },[searchName])

    useEffect(()=>{
        if (categoryName === 'All categories') {
            const itemsFilteredBySearchName = filterItemsBySearchName(expenseItems, searchName)
            setItems(itemsFilteredBySearchName)
        } else {
            if (categoryName) {
                const itemsFilteredByCategory = filterItemsByCategory(expenseItems, categoryName)
                const itemsFilteredBySearchName = filterItemsBySearchName(itemsFilteredByCategory, searchName)
                setItems(itemsFilteredBySearchName)
            }
        }
    },[categoryName])

    return {
        expenses: items,
        createItem: createNewItem
    }
}