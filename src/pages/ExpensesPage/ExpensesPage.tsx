import { IconButton } from "../../components/IconButon/IconButton"
import { NavBar } from "../../components/NavBar/NavBar"
import "./index.css"

export const ExpensesPage = () => {
    return(
        <div className="expenses-index">
            <NavBar/>
            <div className="position-end">
                <IconButton type="plus" size="lx" /*handleClick={handeOpenDialog}*/ />    
            </div>
        </div>
    )
}