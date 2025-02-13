import './Button.css'

interface Props {
    label?: string
    handleClick?: () => void
}

export const Button = ({ label, handleClick }: Props) => {
    return (
        <button className='btn' onClick={handleClick}>{label?.toUpperCase()}</button>
    )
}