import { Income } from "../item"

export interface BudgetStats {
    totalIncome: string
    totalExpenses: string
    totalSavings: string
}

interface Data{
    item: Income
    stats: BudgetStats
}

export interface CreateIncomeResponse {
    message: string
    data: Data
}