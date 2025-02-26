import { configureStore } from "@reduxjs/toolkit";
import { Item } from "../models/interfaces";
import { categorySlice, CategoryState, expensesSlice } from "./states";

export interface AppStore {
    expenses: Item[]
    category: CategoryState    
}

export default configureStore<AppStore>({
    reducer: {
        expenses: expensesSlice.reducer,
        category: categorySlice.reducer
    }
})