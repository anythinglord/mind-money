import { Categories } from "../../data"
import { useState } from "react"
import "./index.css"
import { useDispatch } from "react-redux"
import { setCategory } from "../../redux/states/category"

export const List = () => {

    const options = Categories
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<string>(options[0])
    const [open, setOpen] = useState(false)

    const handleChange = (name: string) => {
        setOpen(prevState => !prevState)
        setSelected(name)
        dispatch(setCategory(name))
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