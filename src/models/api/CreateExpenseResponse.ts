import { Item } from "../item"

export interface Stats {
    total: string
    highestCategory: string,
    untilTodayAmount: string
    selectedAmount: string
}

interface Data{
    item: Item
    stats: Stats
}

export interface CreateExpenseResponse {
    message: string
    data: Data
}