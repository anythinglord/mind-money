import './index.css'

interface Props {
    label?: string
    type?: "button" | "submit" | "reset" | undefined // used in form submit
    variant?: 'contained' | 'outlined'
    handleClick?: () => void
}

export const Button = ({ label = 'button', type = undefined , variant = 'contained', handleClick }: Props) => {
    return (
        <button type={type} className={`btn btn-${variant}`} onClick={handleClick}>{label}</button>
    )
}