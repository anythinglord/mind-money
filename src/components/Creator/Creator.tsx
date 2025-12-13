import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isTrue } from "../../utils";
import { setValitAt } from "../../redux/states";
import { ContainerCategoriesList, ContainerRecurrenciesList } from "../List";
import "./index.css";
import { ZodObject } from "zod";
import { ItemToModify } from "../../models";

interface Props<T extends ZodObject<any>> {
    isEditMode: boolean
    onSubmit: (data: any) => void
    validationSchema: T
    currentItem?: ItemToModify
    type?: 'income' | 'expense'
}

export const Creator = <T extends ZodObject<any>>({ isEditMode, onSubmit, validationSchema, currentItem, type }: Props<T>) => {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="creator-index">
                <div className="creator-content">
                    <div className="group">
                        <div className="row">
                            <Input label="name" register={register} value={isEditMode ? currentItem?.name : ''}
                                error={isTrue(errors.name)} errorMessage={errors.name?.message?.toString()} />
                            <input type="date" className="input-date" onChange={(e) => dispatch(setValitAt(e.target.value))} />
                        </div>
                        <div className="row">
                            <Input label="amount" type="number" register={register}
                                value={isEditMode ? currentItem?.amount : ''}
                                error={isTrue(errors.amount)} errorMessage={errors.amount?.message?.toString()} />
                            <ContainerRecurrenciesList />
                            {type === 'expense' && <ContainerCategoriesList />}
                        </div>
                    </div>
                    <Button type="submit" label={isEditMode ? 'Save' : 'Create'} />
                </div>
            </div>
        </form>
    )
}