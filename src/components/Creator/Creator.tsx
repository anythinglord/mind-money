import { useRef } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./index.css";
import { dialogCloseSubject$ } from "../Dialog/Dialog";

interface Props {
    handleAddItem: (data: any) => void
}

export const Creator = ({ handleAddItem }: Props) => {

    const amountRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleCreateItem = () => {
        handleAddItem({
            description: descriptionRef.current?.value,
            amount: amountRef.current?.value
        })
        // close dialog
        dialogCloseSubject$.setSubject = true;       
    }

    return(
        <div className="creator-index">
            <div className="creator-content">
                <div className="group">
                    <Input label="Description" inputRef={descriptionRef}/>
                    <Input label="Amount" type="number" inputRef={amountRef}/>
                </div>
                <Button label="create" handleClick={handleCreateItem}/>
            </div>
        </div>
    )
}