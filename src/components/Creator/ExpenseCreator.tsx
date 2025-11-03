import { useSelector } from "react-redux"
import { AppStore } from "../../redux/store"
import { Creator } from "./Creator"
import { useExpenses } from "../../hooks/useExpenses"
import { expenseSchema } from "../../schemas/expense.schema"

export const ExpenseCreator = () => {

    const stateCategory = useSelector((store: AppStore) => store.category)
    const stateRecurrence = useSelector((store: AppStore) => store.recurrence)
    const { createExpenseMutation, modifyExpenseMutation } = useExpenses(); 
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    
    const currentItem = stateExpenses.currentItem
    const isEditMode = stateExpenses.mode === 'edit'

    const onSubmit = (data: any) => {
        try {
            if (isEditMode) {
                modifyExpenseMutation.mutate({
                    id: currentItem?.id,
                    name: data.name, amount: data.amount,
                    category: stateCategory.name
                })
            } else {
                createExpenseMutation.mutate({ 
                    name: data.name, amount: data.amount, recurrence: stateRecurrence.name,
                    validAt: stateRecurrence.validAt, category: stateCategory.name
                })    
            }
        } catch (error) {
            throw new Error("Error on submit")
        }
    }

    return(
        <Creator 
            isEditMode={isEditMode} 
            onSubmit={onSubmit}
            validationSchema={expenseSchema(isEditMode)}
            currentItem={currentItem}
        />
    )
}