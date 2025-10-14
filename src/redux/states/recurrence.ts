import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface RecurrenceState {
    name: string
}

const initialState: RecurrenceState = {
    name: 'One time',
}

const initialStateTest = () => {
    const localStorageData = getLocalStorage(LocalStorageTypes.RECURRENCE) 
    ? JSON.parse(getLocalStorage(LocalStorageTypes.RECURRENCE) as string) : initialState
    return localStorageData
}

export const recurrenceSlice = createSlice({
    name: 'recurrence',
    initialState: initialStateTest(),
    reducers: {
        setRecurrence: ( state, action) => {
            state.name = action.payload
            setLocalStorage(LocalStorageTypes.RECURRENCE, { ...state, name: action.payload })
        },
    }
})

export const { setRecurrence } = recurrenceSlice.actions;