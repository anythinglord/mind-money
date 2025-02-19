import "./index.css"
import { Categories } from "../../data"
import { useState } from "react"

export const List = () => {

    const options = Categories
    const [selected, setSelected] = useState<string>(options[0])
    const [open, setOpen] = useState(false)

    const handleChange = (name: string) => {
        setOpen(prevState => !prevState)
        setSelected(name)
    }

    return(
        <div className="list-index">
            <button className={`list-button`} onClick={() => setOpen(prevState => !prevState )}>
                {selected} 
                <i className={`fa-solid fa-chevron-${open ? 'up': 'down'}`}></i>
            </button>
            {open && <div className="list-collapse">
                {options.map((name, index)=>(
                    <div className="list-item" key={index} onClick={() => handleChange(name)}>  
                        <i className={`fa-solid fa-check ${selected !== name ? 'color-white' : '' }`}/>
                        <span>{name}</span>
                    </div>
                ))}
            </div>}
            
        </div>
    )
}