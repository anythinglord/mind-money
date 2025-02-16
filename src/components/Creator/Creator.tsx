import { useRef } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { List } from "../List/List";
import "./index.css";

interface Props {
    handleAddItem: (data: any) => void
    setDialogOpen: () => void
}

export const Creator = ({ handleAddItem, setDialogOpen }: Props) => {

    const amountRef = useRef<HTMLInputElement>(null);
    const handleCreateItem = () => {
        console.log(amountRef.current?.value)
        handleAddItem('data')
        setDialogOpen()        
    }

    return(
        <div className="creator-index">
            <div className="creator-content">
                <div className="group">
                    <Input label="item name"/>
                    <Input label="amount" type="number" inputRef={amountRef}/>
                    <List label="Category" />
                </div>
                <Button label="create" handleClick={handleCreateItem}/>
            </div>
        </div>
    )
}