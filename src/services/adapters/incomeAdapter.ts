import { Income, Type } from "../../models"
import { formatDate } from "../../utils"

export const adaptIncome = (data: Income) => {
    return ({
        name: data.name,
        amount: String(data.amount),
        type: Type.Income,
        createdAt: formatDate(data.createdAt),
        validAt: formatDate(data.validAt),
        recurrence: data.recurrence
    })
}