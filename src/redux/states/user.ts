import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface UserState {
    id?: string
    name?: string
    username?: string    
    email: string
    timestamp?: string
}

const initialState: UserState | null = {
    email: ''
}

const initialStateTest = () => {
    const localStorageData = getLocalStorage(LocalStorageTypes.USER) 
    ? JSON.parse(getLocalStorage(LocalStorageTypes.USER) as string) : initialState
    return localStorageData
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateTest(),
    reducers: {
        setUser: ( _state, action) => {
            setLocalStorage(LocalStorageTypes.USER, action.payload)
            return action.payload
        },
        setEmail: ( state, action) => {
            state.email = action.payload
            setLocalStorage(LocalStorageTypes.USER, { ...state, email: action.payload })
        },
        setTimeStamp: ( state, action) => {
            state.timestamp = action.payload
            setLocalStorage(LocalStorageTypes.USER, { ...state, timestamp: action.payload })
        }
    }
})

export const { setUser, setEmail, setTimeStamp } = userSlice.actions;