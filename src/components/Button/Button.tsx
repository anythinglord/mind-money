import './Button.css'

interface Props {
    label?: string
    handleClick?: () => void
}

export const Button = ({ label = 'button', handleClick }: Props) => {
    return (
        <button className='btn' onClick={handleClick}>{label}</button>
    )
}