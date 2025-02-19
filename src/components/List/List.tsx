import "./index.css"
import { HomePageSections } from "../../data"
import { useState } from "react"

interface Props {
    label?: string
}

export const List = ({ label }: Props) => {

    const options = HomePageSections
    const [open, setOpen] = useState(false)

    return(
        <div className="list-index">
            <button className={`list-button`} onClick={() => setOpen(prevState => !prevState )}>
                {label} 
                <i className={`fa-solid fa-chevron-${open ? 'up': 'down'}`}></i>
            </button>
            <div className="list-collapse">
                {open && options.map(({ name })=>(
                    <div className="list-item">{  name }</div>
                ))}
            </div>
        </div>
    )
} 