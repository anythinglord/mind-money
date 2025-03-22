import { RefObject, useState } from "react";
import './Input.css'

type inputType = 'password' | 'text' | 'number'

interface Props {
    type?: inputType
    label?: string
    inputRef?: RefObject<HTMLInputElement>;
    error?: boolean
}

export const Input = ({ type = 'text', label = '', inputRef, error = false }: Props) => {

    const [active, setActive] = useState<boolean>(false);
    const changeState = () => {
        setActive(prevState => prevState ? false : true)
    }

    return(
        <div className="input-root">
            <div className={`input-index ${error ? 'has-error' : ''}`}>
                <input type={ active ? "text" : type } className='input' ref={inputRef} placeholder={label}/>
                {type === 'password' && <i className={`fa-solid fa-eye${active ? '-slash' : ''}`} onClick={changeState}/>}
            </div>
            {error && <div className="input-error">
                <i className="fa-solid fa-circle-exclamation"/>
                The passwords don't match. Please try again.
            </div>}
        </div>
        
    )
}