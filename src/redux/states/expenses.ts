import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models/interfaces";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

const initialState: Item[] = []

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES) 
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {
        addExpense: (state, action) => {
            setLocalStorage(LocalStorageTypes.EXPENSES, state)
            return action.payload
        } 
    }
})

export const { addExpense } = expensesSlice.actions;