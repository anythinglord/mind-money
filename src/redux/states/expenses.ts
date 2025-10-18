import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, ItemToModify } from "../../models";
import { LocalStorageTypes } from "../../models";
import { setLocalStorage, getLocalStorage } from "../../utilities"

export interface ExpenseState {
    items: Item[]
    mode: typeMode
    currentItem?: ItemToModify
}

type typeMode = 'create' | 'edit' | 'none'

const initialState: ExpenseState = {
    items: [],
    mode: 'none'
}

export const saveExpense = createAsyncThunk(
    'expenses/saveExpense',
    async ({ item, currentItems }: { item: Item, currentItems: Item[] }, thunkAPI) => {
        const newItems = [...currentItems, item]
        try {
            const currentState = JSON.parse(getLocalStorage(LocalStorageTypes.EXPENSES) as string)
            setLocalStorage(LocalStorageTypes.EXPENSES, {...currentState, items: newItems })
        } catch (error) {
            console.error("Error saving new item", error);
        }
        return newItems
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
            state.items = action.payload; 
            state.status = 'succeeded';
          })
      },
})

export const { addExpense, setExpenses, changeMode, setCurrentItem } = expensesSlice.actions;
export default expensesSlice.reducer