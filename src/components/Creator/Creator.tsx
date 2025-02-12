import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { List } from "../List/List";
import "./index.css";

export const Creator = () => {
    return(
        <div className="creator-index">
            <div className="creator-content">
                <div className="group">
                    <Input label="item name"/>
                    <List label="Category" />
                </div>
                <Button label="create" handleClick={() => {}}/>
            </div>
        </div>
    )
}