import { Item } from "../../models/interfaces"
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
                {data.map(({ date, description, category, amount }, index) => (
                    <div className="table-row flex-sp-cen" key={index}>
                        <div className="tbl-column col-left">{date}</div>
                        <div className="tbl-column">{description}</div>
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