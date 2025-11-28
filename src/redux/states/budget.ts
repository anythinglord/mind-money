import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Income, ItemToModify, Section } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"
import { mockBudgetStats } from '../../data'
import { BudgetStats } from "../../models";
import { updateBudgetStats } from "../../utils";

export interface BudgetState {
    items: Income[]
    mode: typeMode
    currentItem?: ItemToModify
    stats: Section[]
}

type typeMode = 'create' | 'edit' | 'none'

const initialState: BudgetState = {
    items: [],
    mode: 'none',
    stats: mockBudgetStats
}

export const updateBStats = createAsyncThunk(
    'budget/updateStats',
    async ({ stats }: { stats: BudgetStats }, _) => {
        const newStats = updateBudgetStats(mockBudgetStats, stats)
        try {
            const currentState = JSON.parse(getLocalStorage(LocalStorageTypes.BUDGET) as string)
            setLocalStorage(LocalStorageTypes.BUDGET, {...currentState, stats: newStats })
        } catch (error) {
            console.error("Error saving new item", error);
        }
        return newStats
    }
)

export const saveIncome = createAsyncThunk(
    'budget/saveIncome',
    async ({ item, currentItems, stats }: { item: Income, currentItems: Income[], stats: BudgetStats }, _) => {
        const newItems = [...currentItems, item]
        const newStats = updateBudgetStats(mockBudgetStats, stats)
        try {
            const currentState = JSON.parse(getLocalStorage(LocalStorageTypes.BUDGET) as string)
            setLocalStorage(LocalStorageTypes.BUDGET, {...currentState, items: newItems, stats: newStats })
        } catch (error) {
            console.error("Error saving new item", error);
        }
        return {
            newItems: newItems,
            newStats: newStats
        }
    }
)

export const budgetSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES)
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveIncome.fulfilled, (state, action) => {
                state.items = action.payload.newItems;
                state.stats = action.payload.newStats 
            })
            .addCase(updateBStats.fulfilled, (state, action) => {
                state.stats = action.payload; 
            })     
      },
})

export default budgetSlice.reducer