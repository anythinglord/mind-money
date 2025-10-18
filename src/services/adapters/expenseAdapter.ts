import { Item, ItemCreated, Type } from "../../models"
import { formatDate } from "../../utils"

export const adaptExpense = (data: ItemCreated | Item) => {
    return({
        name: data.name,
        amount: String(data.amount),
        category: data.category,
        type:  Type.Expenses,
        createdAt: formatDate(data.createdAt),
        validAt: formatDate(data.validAt),
        recurrence: data.recurrence    
    })
}