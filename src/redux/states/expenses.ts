import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, ItemToModify, Section } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"
import { mockExpenseStats } from '../../data'
import { Stats } from "../../models/api/CreateExpenseResponse";
import { updateExpenseStats } from "../../utils";
export interface ExpenseState {
    items: Item[]
    mode: typeMode
    currentItem?: ItemToModify
    stats: Section[]
}

type typeMode = 'create' | 'edit' | 'none'

const initialState: ExpenseState = {
    items: [],
    mode: 'none',
    stats: mockExpenseStats
}

export const updateStats = createAsyncThunk(
    'expenses/updateStats',
    async ({ stats }: { stats: Stats }, _) => {
        const newStats = updateExpenseStats(mockExpenseStats, stats)
        try {
            const currentState = JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string)
            setLocalStorage(LocalStorageTypes.EXPENSES, {...currentState, stats: newStats })
        } catch (error) {
            console.error("Error saving new item", error);
        }
        return newStats
    }
)

export const saveExpense = createAsyncThunk(
    'expenses/saveExpense',
    async ({ item, currentItems, stats }: { item: Item, currentItems: Item[], stats: Stats }, _) => {
        const newItems = [...currentItems, item]
        const newStats = updateExpenseStats(mockExpenseStats, stats)
        try {
            const currentState = JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string)
            setLocalStorage(LocalStorageTypes.EXPENSES, {...currentState, items: newItems, stats: newStats })
        } catch (error) {
            console.error("Error saving new item", error);
        }
        return {
            newItems: newItems,
            newStats: newStats
        }
    }
)

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: getLocalStorage(LocalStorageTypes.EXPENSES)
        ? JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string) : initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Item>) => {
            state.items = [...state.items, action.payload]
        },
        setExpenses: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, { ...state, items: action.payload })
        },
        changeMode: (state, action: PayloadAction<typeMode>) => {
            state.mode = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, { ...state, mode: action.payload })
        },
        setCurrentItem: (state, action: PayloadAction<ItemToModify>) => {
            state.currentItem = action.payload;
            setLocalStorage(LocalStorageTypes.EXPENSES, { ...state, currentItem: action.payload })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveExpense.fulfilled, (state, action) => {
                state.items = action.payload.newItems;
                state.stats = action.payload.newStats 
            })
            .addCase(updateStats.fulfilled, (state, action) => {
                state.stats = action.payload; 
            })     
      },
})

export const { addExpense, setExpenses, changeMode, setCurrentItem } = expensesSlice.actions;
export default expensesSlice.reducer