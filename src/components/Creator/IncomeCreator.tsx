import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store"
import { useBudget } from "../../hooks/useBudget";
import { expenseSchema } from "../../schemas/expense.schema";
import { Creator } from "./Creator";

export const IncomeCreator = () => {
    
    const stateRecurrence = useSelector((store: AppStore) => store.recurrence)
    const { createIncomeMutation } = useBudget(); 
    const stateExpenses = useSelector((store: AppStore) => store.budget)
    
    const currentItem = stateExpenses.currentItem
    const isEditMode = stateExpenses.mode === 'edit'

    const onSubmit = (data: any) => {
        try {
            if (isEditMode) {
                /*createIncomeMutation.mutate({
                    id: currentItem?.id,
                    name: data.name, amount: data.amount,
                    category: stateCategory.name
                })*/
            } else {
                createIncomeMutation.mutate({ 
                    name: data.name, amount: data.amount, recurrence: stateRecurrence.name,
                    validAt: stateRecurrence.validAt
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