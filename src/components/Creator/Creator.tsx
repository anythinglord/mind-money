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
import { ItemCreated } from "../../models";
import { createExpense } from "../../services";
import { formatDate } from "../../utils";

export const Creator = () => {

    const stateCategory = useSelector((store: AppStore) => store.category)
    const { createItem } = useExpenses(); 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(expenseSchema),
    });

    const onSubmit = (data: any) => {
        try {
            console.log(data)
            const { name, amount } = data;
            createNewExpense.mutate({ 
                name: name, amount: amount, category: stateCategory.name 
            })
        } catch (error) {
            throw new Error("Error on submit")
        }
    }

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
                        <Input label="name" register={register} 
                            error={isTrue(errors.name)}  errorMessage={errors.name?.message} />
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