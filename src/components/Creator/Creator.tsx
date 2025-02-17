import { useRef } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./index.css";

interface Props {
    handleAddItem: (data: any) => void
    setDialogOpen: () => void
}

export const Creator = ({ handleAddItem, setDialogOpen }: Props) => {

    const amountRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleCreateItem = () => {
        handleAddItem({
            description: descriptionRef.current?.value,
            amount: amountRef.current?.value
        })
        setDialogOpen()        
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