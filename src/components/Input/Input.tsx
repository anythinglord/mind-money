import './Input.css'

type inputType = 'password' | 'text' 

interface Props {
    type?: inputType
    label?: string
}

export const Input = ({ type = 'text', label = '' }: Props) => {
    return(
        <div className='index'>
            <div className="label">{label}</div>
            <input type={type} className='input'/>
        </div>
    )
}