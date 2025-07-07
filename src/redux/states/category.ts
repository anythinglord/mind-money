import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface CategoryState {
    name: string
    filterName: string
    searchName: string
}
const initialState: CategoryState = {
    name: '',
    filterName: '',
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
        setFilterCategory: ( state, action) => {
            state.filterName = action.payload
            setLocalStorage(LocalStorageTypes.CATEGORY, { ...state, filterName: action.payload })
        },
        setSearchName: ( state, action) => {
            state.searchName = action.payload
            setLocalStorage(LocalStorageTypes.CATEGORY, { ...state, searchName: action.payload })
        }
    }
})

export const { setCategory, setFilterCategory, setSearchName } = categorySlice.actions;