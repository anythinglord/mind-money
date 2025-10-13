
import { useState } from "react"
import "./index.css"


interface Props {
    initialValue: string
    items: string[]
    onItemSelected: (item: string) => void
}

export const List = ({ initialValue, items, onItemSelected }: Props) => {
    
    const [selected, setSelected] = useState<string>(initialValue)
    const [open, setOpen] = useState(false)
    
    const handleChange = (name: string) => {
        setOpen(prevState => !prevState)
        setSelected(name)
        onItemSelected(name)
    }
    return(
        <div className="list-index">
            <button type="button" className={`list-button`} onClick={() => setOpen(prevState => !prevState )}>
                {selected} 
                <i className={`fa-solid fa-chevron-${open ? 'up': 'down'}`}></i>
            </button>
            {open && <div className="list-collapse">
                {items.map((name, index) => (
                    <div className="list-item" key={index} onClick={() => handleChange(name)}>  
                        <i className={`fa-solid fa-check ${selected !== name ? 'color-white' : '' }`}/>
                        <span>{name}</span>
                    </div>
                ))}
            </div>}
        </div>
    )
}