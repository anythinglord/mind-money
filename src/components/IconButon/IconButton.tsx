import "./index.css"

interface Props {
    type?: string
    handleClick?: () => void
}

export const IconButton = ({ type = 'plus', handleClick }: Props) => {
    return(
        <button className="iconb-index" onClick={handleClick}>
            <i className={`fa-solid fa-${type}`} />
        </button>
    )
}