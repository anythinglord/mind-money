import { IconButton } from "../../components/IconButon/IconButton"
import { NavBar } from "../../components/NavBar/NavBar"
import { Table } from "../../components/Table/Table"
import "./index.css"

export const ExpensesPage = () => {
    return(
        <div className="expenses-index">
            <NavBar/>
            <div className="page-content">
                <Table data={[]} />
                <div className="position-end">
                    <IconButton type="plus" size="lx" /*handleClick={handeOpenDialog}*/ />    
                </div>
            </div>
        </div>
    )
}