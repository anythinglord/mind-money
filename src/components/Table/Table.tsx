import "./index.css"

export const Table = () => {

    const columns: string[] = ['Date', 'Description', 'Category', 'Amount']

    return (
        <div className="table-index">
            <div className="table-header table-row">
                {columns.map((column) => (<div>{column}</div>))}
            </div>
            <div className="table-row">
                {columns.map((column) => (<div>{column}</div>))}
            </div>
        </div>
    )
}