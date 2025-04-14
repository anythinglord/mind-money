import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

const initialState: Item[] = []

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES) 
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {
        addExpense: ( state, action: PayloadAction<Item>) => {
            state.push(action.payload)
            setLocalStorage(LocalStorageTypes.EXPENSES, state)
        },
        setExpenses: ( state, action: PayloadAction<Item[]>) => {
            state = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, state)
        }, 
    }
})

export const { addExpense, setExpenses } = expensesSlice.actions;