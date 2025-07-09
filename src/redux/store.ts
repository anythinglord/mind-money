import { configureStore } from "@reduxjs/toolkit";
import { categorySlice, CategoryState, ExpenseState, expensesSlice, userSlice, UserState } from "./states";

export interface AppStore {
    expenses: ExpenseState
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