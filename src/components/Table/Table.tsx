import { Item } from "../../models"
import "./index.css"

interface Props {
    data: Item[]
}

export const Table = ({ data }: Props) => {

    const columns: string[] = ['Date', 'Description', 'Category', 'Amount']
    return (
        <div className="table-index">
            <div className="table-header flex-sp-cen">
                {columns.map((column, index) => (
                    <div className={`tbl-column ${index === 0 ? 'col-left' : ''}`} key={index}>
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
                    </div>
                ))}
            </div>
            <div className="table-footer">
                footer
            </div>
        </div>
    )
}