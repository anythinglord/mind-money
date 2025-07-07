import { useDispatch } from "react-redux"
import { Item } from "../../models"
import { IconButton } from "../IconButon"
import "./index.css"
import { changeMode, setCategory, setCurrentItem } from "../../redux/states"
import { dialogOpenSubject$ } from '../Dialog'

interface Props {
    data: Item[]
}

export const Table = ({ data }: Props) => {

    const columns: string[] = ['Date', 'Description', 'Category', 'Amount', '']
    const dispatch = useDispatch()

    /**
     * Open dialog to edit expense
     * @returns void
     */
    const handleOpenDialog = (item: Item) => {
        dispatch(setCurrentItem(item))
        dispatch(changeMode('edit'))
        dispatch(setCategory(item.category))
        // open dialog to edit item
        dialogOpenSubject$.setSubject = true;    
    }

    return (
        <div className="table-index">
            <div className="table-header flex-sp-cen">
                {columns.map((column, index) => (
                    <div className={
                        ` ${index === 4 ? 'tbl-column-tiny' : 'tbl-column'} 
                        ${index === 0 ? 'col-left' : ''}` } 
                        key={index}>
                        {column}
                    </div>
                ))}
            </div>
            <div className="table-content">
                {data.map((item, index) => (
                    <div className="table-row flex-sp-cen" key={index}>
                        <div className="tbl-column col-left">{item.createdAt?.slice(0,10)}</div>
                        <div className="tbl-column">{item.name}</div>
                        <div className="tbl-column">{item.category}</div>
                        <div className="tbl-column">{item.amount}</div>
                        <div className="tbl-column-tiny">
                            <IconButton size="nsx" type="pen" variant="outlined" handleClick={() => handleOpenDialog(item)}/>
                            <IconButton size="nsx" type="trash" variant="outlined"/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="table-footer">
                footer
            </div>
        </div>
    )
}