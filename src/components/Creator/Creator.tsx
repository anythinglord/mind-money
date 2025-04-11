import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { dialogCloseSubject$ } from "../Dialog/Dialog";
import { List } from "../List";
import { AppStore } from "../../redux/store"
import "./index.css";
import { useSelector } from "react-redux";
import { useExpenses } from "../../hooks/useExpenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../../schemas/expense.schema";
import { useForm } from "react-hook-form";
import { isTrue } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { ItemCreated, ItemCreatedWithoutCategory } from "../../models";
import { createExpense } from "../../services";

export const Creator = () => {

    const stateCategory = useSelector((store: AppStore) => store.category)
    const { createItem } = useExpenses(); 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(expenseSchema),
    });

    const onSubmit = (data: ItemCreatedWithoutCategory) => {
        try {
            console.log(data)
            const { description, amount } = data;
            createNewExpense.mutate({ 
                description: description, amount: amount, category: stateCategory.name 
            })
        } catch (error) {
            throw new Error("Error on submit")
        }
    }

    const createNewExpense = useMutation({
        mutationFn: (expense: ItemCreated) => createExpense(
            expense.description, expense.amount, expense.category
        ),
        
        onSuccess: (data: ItemCreated) => {
            createItem({
                description: data.name,
                amount: data.amount,
                category: data.category
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
                        <Input label="description" register={register} 
                            error={isTrue(errors.description)}  errorMessage={errors.description?.message} />
                        <div className="row">
                            <Input label="amount" type="number" register={register} 
                                error={isTrue(errors.amount)}  errorMessage={errors.amount?.message} />
                            <List />
                        </div>
                    </div>
                    <Button type="submit" label="create" />
                </div>
            </div>    
        </form>
    )
}