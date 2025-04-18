import { useState } from "react";
import './Input.css'
import { UseFormRegister } from "react-hook-form";
import { capitalize } from "../../utils";

type inputType = 'password' | 'text' | 'number'

interface Props {
    type?: inputType
    label?: string
    //inputRef?: RefObject<HTMLInputElement>;
    register: UseFormRegister<any>
    error?: boolean
    errorMessage?: string
}

/* The passwords don't match. Please try again. */

export const Input = ({ type = 'text', label = '', error = false, errorMessage, register }: Props) => {

    const [active, setActive] = useState<boolean>(false);
    const changeState = () => {
        setActive(prevState => prevState ? false : true)
    }

    return(
        <div className="input-root">
            <div className={`input-index ${error ? 'has-error' : ''}`}>
                <input 
                    type={ active ? "text" : type } className='input' 
                    placeholder={capitalize(label)} {...register(label)} 
                />
                {type === 'password' && <i className={`fa-solid fa-eye${active ? '-slash' : ''}`} onClick={changeState}/>}
            </div>
            {error && <div className="input-error">
                <i className="fa-solid fa-circle-exclamation"/>
                {errorMessage}
            </div>}
        </div>
    )
}