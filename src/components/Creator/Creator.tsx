import { useRef } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { dialogCloseSubject$ } from "../Dialog/Dialog";
import { List } from "../List";
import { AppStore } from "../../redux/store"
import "./index.css";
import { useSelector } from "react-redux";

interface Props {
    handleAddItem: (data: any) => void
}

export const Creator = ({ handleAddItem }: Props) => {

    const amountRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const stateCategory = useSelector((store: AppStore) => store.category) 

    const handleCreateItem = () => {
        handleAddItem({
            description: descriptionRef.current?.value,
            amount: amountRef.current?.value,
            category: stateCategory.name
        })
        // close dialog
        dialogCloseSubject$.setSubject = true;       
    }

    return(
        <div className="creator-index">
            <div className="creator-content">
                <div className="group">
                    <Input label="Description" inputRef={descriptionRef}/>
                    <div className="row">
                        <Input label="Amount" type="number" inputRef={amountRef}/>
                        <List />
                    </div>
                </div>
                <Button label="create" handleClick={handleCreateItem}/>
            </div>
        </div>
    )
}