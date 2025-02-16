import { RefObject } from "react";
import './Input.css'

type inputType = 'password' | 'text' | 'number'

interface Props {
    type?: inputType
    label?: string
    inputRef?: RefObject<HTMLInputElement>;
}

export const Input = ({ type = 'text', label = '', inputRef }: Props) => {
    return(
        <div className='index'>
            <div className="label">{label}</div>
            <input type={type} className='input' ref={inputRef}/>
        </div>
    )
}