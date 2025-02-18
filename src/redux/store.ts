import { configureStore } from "@reduxjs/toolkit";
import { Item } from "../models/interfaces";
import { expensesSlice } from "./states";

export interface AppStore {
    expenses: Item[]    
}

export default configureStore<AppStore>({
    reducer: {
        expenses: expensesSlice.reducer
    }
})