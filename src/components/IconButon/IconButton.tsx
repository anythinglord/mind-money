import "./index.css"

interface Props {
    type?: string
    size?: 'sx' | 'mx' | 'lx'
    variant?: 'contained' | 'outlined'
    handleClick?: () => void
}

export const IconButton = ({ type = 'plus', size = 'sx', variant = 'outlined', handleClick }: Props) => {
    return (
        <button className={`ib-index ib-${size} ib-${variant}`} onClick={handleClick}>
            <i className={`fa-solid fa-${type}`} />
        </button>
    )
}