import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, ItemToModify } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface ExpenseState {
    items: Item[]
    mode: typeMode
    currentItem?: ItemToModify
}

type typeMode = 'create' | 'edit'

const initialState: ExpenseState = {
    items: [],
    mode: 'create'
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES) 
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {
        addExpense: ( state, action: PayloadAction<Item>) => {
            const newItems = state.items.push(action.payload)
            setLocalStorage(LocalStorageTypes.EXPENSES, {...state, items: newItems })
        },
        setExpenses: ( state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, {...state, items: action.payload })
        },
        changeMode: ( state, action: PayloadAction<typeMode>) => {
            state.mode = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, {...state, mode: action.payload })
        },
        setCurrentItem: ( state, action: PayloadAction<ItemToModify>) => {
            state.currentItem = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, {...state, currentItem: action.payload })
        }
    }
})

export const { addExpense, setExpenses, changeMode, setCurrentItem } = expensesSlice.actions;