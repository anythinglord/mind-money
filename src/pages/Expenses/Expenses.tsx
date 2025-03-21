import { Creator } from "../../components/Creator"
import { Dialog } from "../../components/Dialog"
import { NavBar } from "../../components/NavBar"
import { Table } from "../../components/Table"
import { Type, Item, ItemCreated } from '../../models';
import { useDispatch, useSelector } from "react-redux"
import { addExpense } from "../../redux/states"
import { Filter } from "../../components/Filter"
import { CardList } from "../../components/CardList"
import { ExpensesCardSections } from "../../data"

import "./index.css"
import { useExpenses } from "../../hooks/useExpenses";

export const ExpensesPage = () => {

    const { expenses } = useExpenses();

    return(
        <div className="expenses-index">
            <NavBar/>
            <Dialog title='Create Expense'>
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