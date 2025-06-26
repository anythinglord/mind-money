import { Item } from "../../models"
import { IconButton } from "../IconButon"
import "./index.css"

interface Props {
    data: Item[]
}

export const Table = ({ data }: Props) => {

    const columns: string[] = ['Date', 'Description', 'Category', 'Amount', '']

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
                {data.map(({ createdAt, name, category, amount }, index) => (
                    <div className="table-row flex-sp-cen" key={index}>
                        <div className="tbl-column col-left">{createdAt?.slice(0,10)}</div>
                        <div className="tbl-column">{name}</div>
                        <div className="tbl-column">{category}</div>
                        <div className="tbl-column">{amount}</div>
                        <div className="tbl-column-tiny">
                            <IconButton size="nsx" type="pen" variant="outlined"/>
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