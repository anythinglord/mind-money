import { useState } from "react"
import { Creator } from "../../components/Creator"
import { Dialog } from "../../components/Dialog"
import { NavBar } from "../../components/NavBar"
import { Table } from "../../components/Table"
import { Type, Item, ItemCreated } from '../../models';
import { useDispatch } from "react-redux"
import { addExpense } from "../../redux/states"
import store from "../../redux/store"
import { Filter } from "../../components/Filter"
import { CardList } from "../../components/CardList"
import { ExpensesCardSections } from "../../data"
import "./index.css"

export const ExpensesPage = () => {

    const dispatch = useDispatch()
    const [items, setItems] = useState<Item[]>(store.getState().expenses)

    const createNewItem = (data: ItemCreated) => {
        const { description, amount } = data;
        setItems((prevItems) => {
            var newItems = [...prevItems]
            const newItem: Item = { 
                date: '2025-02-13',
                description: description,
                category: 'Food',
                type:  Type.Expenses,
                amount: amount 
            }
            newItems.push(newItem)
            dispatch(addExpense(newItems))
            return newItems
        })
    }

    return(
        <div className="expenses-index">
            <NavBar/>
            <Dialog>
                <Creator handleAddItem={createNewItem} />
            </Dialog>
            <div className="page-content">
                <div className="page-title">
                    Expenses Overview
                </div>
                <CardList data={ExpensesCardSections}/>
                <Filter />
                <Table data={items} />
            </div>
        </div>
    )
}