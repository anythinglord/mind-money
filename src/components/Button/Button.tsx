import './index.css'

interface Props {
    label?: string
    type?: "button" | "submit" | "reset" | undefined // used in form submit
    variant?: 'contained' | 'outlined' | 'text'
    handleClick?: () => void
}

export const Button = ({ label = 'button', type = "button" , variant = 'contained', handleClick }: Props) => {
    return (
        <button 
            type={type} 
            className={`btn btn-${variant}`} 
            onClick={handleClick}>
            {label}
        </button>
    )
}