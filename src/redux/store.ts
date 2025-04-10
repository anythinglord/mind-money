import { configureStore } from "@reduxjs/toolkit";
import { Item } from "../models";
import { categorySlice, CategoryState, expensesSlice, userSlice, UserState } from "./states";

export interface AppStore {
    expenses: Item[]
    category: CategoryState
    user: UserState    
}

export default configureStore<AppStore>({
    reducer: {
        expenses: expensesSlice.reducer,
        category: categorySlice.reducer,
        user: userSlice.reducer
    }
})