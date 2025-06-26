import { useEffect } from "react"
import { Item, ItemCreated, Type } from '../models'
import { useDispatch, useSelector } from "react-redux"
import { AppStore } from "../redux/store"
import { addExpense, setExpenses } from "../redux/states"
import { useMutation } from "@tanstack/react-query"
import { getExpenses } from "../services"

export const useExpenses = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const categoryName = stateCategory.name;
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    // const [items, setItems] = useState<Item[]>(stateExpenses)
    const dispatch = useDispatch()
    
    const createNewItem = (data: ItemCreated) => {
        const { name, amount, category } = data;
        console.log('creating new item :', data)
        const newItem: Item = { 
            date: '2025-02-13',
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
            console.log(expenses)
            dispatch(setExpenses(expenses))
        },
        onError: () => console.log('error load expenses')
    })

    useEffect(()=>{
        getExpensesMutation.mutate()
    },[])

    useEffect(()=>{
        if (categoryName === 'All categories') {
            //setItems(stateExpenses)
        } else {
            // const filteredItems = [...stateExpenses].filter((item) => item.category === categoryName)
            //setItems(filteredItems)
            // dispatch(setExpenses(filteredItems))
        }
    },[categoryName])

    return {
        expenses: stateExpenses,
        createItem: createNewItem
    }
}