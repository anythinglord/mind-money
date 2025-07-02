import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface CategoryState {
    name: string
    searchName: string
}
const initialState: CategoryState = {
    name: '',
    searchName: ''
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
        },
        setSearchName: ( state, action) => {
            state.searchName = action.payload
            setLocalStorage(LocalStorageTypes.CATEGORY, { ...state, searchName: action.payload })
        }
    }
})

export const { setCategory, setSearchName } = categorySlice.actions;