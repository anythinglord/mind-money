import { configureStore } from "@reduxjs/toolkit";
import { categorySlice, CategoryState, ExpenseState, expensesSlice, userSlice, UserState } from "./states";
import { RecurrenceState, recurrenceSlice } from "./states/recurrence";

export interface AppStore {
    expenses: ExpenseState
    category: CategoryState
    recurrence: RecurrenceState
    user: UserState    
}

export const store = configureStore<AppStore>({
    reducer: {
        expenses: expensesSlice.reducer,
        category: categorySlice.reducer,
        user: userSlice.reducer,
        recurrence: recurrenceSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;