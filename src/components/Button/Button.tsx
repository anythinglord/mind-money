import './index.css'

interface Props {
    label?: string
    variant?: 'contained' | 'outlined'
    handleClick?: () => void
}

export const Button = ({ label = 'button', variant = 'contained', handleClick }: Props) => {
    return (
        <button className={`btn btn-${variant}`} onClick={handleClick}>{label}</button>
    )
}