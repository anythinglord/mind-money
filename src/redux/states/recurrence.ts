import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes, Recurrence } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface RecurrenceState {
    name: Recurrence
    validAt: string
}

const initialState: RecurrenceState = {
    name: Recurrence.ONE,
    validAt: ''
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
        setValitAt: ( state, action) => {
            state.validAt = action.payload
            setLocalStorage(LocalStorageTypes.RECURRENCE, { ...state, validAt: action.payload })
        },
    }
})

export const { setRecurrence, setValitAt } = recurrenceSlice.actions;