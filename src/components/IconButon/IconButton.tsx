import "./index.css"

interface Props {
    type: string
}

export const IconButton = ({ type }: Props) => {
    return(
        <div className="iconb-index">
            <i className={`fa-solid fa-${type}`} />
        </div>
    )
}