import { Creator } from "../../components/Creator"
import { Dialog } from "../../components/Dialog"
import { NavBar } from "../../components/NavBar"
import { Table } from "../../components/Table"
import { Filter } from "../../components/Filter"
import { CardList } from "../../components/CardList"
import { ExpensesCardSections } from "../../data"
import { useExpenses } from "../../hooks/useExpenses";
import { useSelector } from "react-redux"
import { AppStore } from "../../redux/store"
import "./index.css"

export const ExpensesPage = () => {

    const { expenses } = useExpenses();
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const mode = stateExpenses.mode
        
    return(
        <div className="expenses-index">
            <NavBar/>
            <Dialog title={`${mode === 'edit' ? 'Edit' : 'Create'} Expense`} >
                <Creator />
            </Dialog>
            <div className="page-content">
                <div className="page-title">
                    Expenses Overview
                </div>
                <CardList data={ExpensesCardSections}/>
                <Filter />
                <Table data={expenses} />
            </div>
        </div>
    )
}