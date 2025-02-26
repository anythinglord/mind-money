import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models/interfaces";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface CategoryState {
    name: string
    items: Item[]
}
const initialState: CategoryState = {
    name: '',
    items: []
}

const initialStateTest = () => {
    const localStorageData = getLocalStorage(LocalStorageTypes.CATEGORY) 
    ? JSON.parse(getLocalStorage(LocalStorageTypes.CATEGORY) as string) : initialState
    return localStorageData
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialStateTest(),
    reducers: {
        setCategory: ( state, action) => {
            state.name = action.payload
            setLocalStorage(LocalStorageTypes.CATEGORY, { ...state, name: action.payload })
        } 
    }
})

export const { setCategory } = categorySlice.actions;