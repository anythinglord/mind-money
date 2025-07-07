import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { dialogCloseSubject$ } from "../Dialog/Dialog";
import { List } from "../List";
import { AppStore } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux";
import { useExpenses } from "../../hooks/useExpenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../../schemas/expense.schema";
import { useForm } from "react-hook-form";
import { isTrue } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { Item, ItemCreated, ItemToModify } from "../../models";
import { createExpense, editExpense } from "../../services";
import { formatDate } from "../../utils";
import "./index.css";
import { changeMode } from "../../redux/states";

export const Creator = () => {

    const stateCategory = useSelector((store: AppStore) => store.category)
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const currentItem = stateExpenses.currentItem
    const isEditMode = stateExpenses.mode === 'edit'
    const dispatch = useDispatch()
    const { createItem, updateItem } = useExpenses(); 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(expenseSchema(isEditMode)),
    });

    const onSubmit = (data: any) => {
        try {
            if (isEditMode) {
                modifyExpense.mutate({
                    id: currentItem?.id,
                    name: data.name, amount: data.amount,
                    category: stateCategory.name
                })
            } else {
                createNewExpense.mutate({ 
                    name: data.name, amount: data.amount,
                    category: stateCategory.name
                })    
            }
        } catch (error) {
            throw new Error("Error on submit")
        }
    }

    const modifyExpense = useMutation({
        mutationFn: (expense: ItemToModify) => editExpense(expense),
        onSuccess: (item: Item) => {
            updateItem(item)
            // close dialog
            dialogCloseSubject$.setSubject = true;
            // change mode to none
            dispatch(changeMode('none'))
        },
        onError: () => alert('Error modifing item'),
    })

    const createNewExpense = useMutation({
        mutationFn: (expense: ItemCreated) => createExpense(
            expense.name, expense.amount, expense.category
        ),
        onSuccess: (data: ItemCreated) => {
            createItem({
                name: data.name,
                amount: String(data.amount),
                category: data.category,
                createdAt: formatDate(data.createdAt)
            })
            // close dialog
            dialogCloseSubject$.setSubject = true;
        },
        onError: () => alert('Error creating item'),
    })

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="creator-index">
                <div className="creator-content">
                    <div className="group">
                        <Input label="name" register={register} value={ isEditMode ? currentItem?.name : '' }
                            error={isTrue(errors.name)}  errorMessage={errors.name?.message} />
                        <div className="row">
                            <Input label="amount" type="number" register={register} 
                                value={ isEditMode ? currentItem?.amount : '' }
                                error={isTrue(errors.amount)}  errorMessage={errors.amount?.message} />
                            <List value={ isEditMode ? currentItem?.category : ''} isEditMode={isEditMode}/>
                        </div>
                    </div>
                    <Button type="submit" label={isEditMode ? 'Save' : 'Create'} />
                </div>
            </div>    
        </form>
    )
}