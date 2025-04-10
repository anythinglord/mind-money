import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

const initialState: Item[] = []

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES) 
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {
        addExpense: ( _, action) => {
            setLocalStorage(LocalStorageTypes.EXPENSES, action.payload)
            return action.payload
        } 
    }
})

export const { addExpense } = expensesSlice.actions;