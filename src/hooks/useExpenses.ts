import { useEffect, useState } from "react"
import { Item, ItemCreated, Type } from '../models'
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "../redux/store"
import { addExpense } from "../redux/states"

export const useExpenses = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const categoryName = stateCategory.name;
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const [items, setItems] = useState<Item[]>(stateExpenses)
    const dispatch = useDispatch()
    
    const createNewItem = (data: ItemCreated) => {
        const { description, amount, category } = data;
        setItems((prevItems) => {
            var newItems = [...prevItems]
            const newItem: Item = { 
                date: '2025-02-13',
                description: description,
                category: category,
                type:  Type.Expenses,
                amount: amount 
            }
            newItems.push(newItem)
            dispatch(addExpense(newItems))
            return newItems
        })
    }

    useEffect(()=>{
        if (categoryName === 'All categories') {
            setItems(stateExpenses)
        } else {
            const filteredItems = [...stateExpenses].filter((item) => item.category === categoryName)
            setItems(filteredItems)
        }
    },[categoryName])

    return {
        expenses: items,
        createItem: createNewItem
    }
}