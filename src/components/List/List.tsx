import { Categories } from "../../data"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCategory } from "../../redux/states/category"
import { AppStore } from "../../redux/store"
import "./index.css"

export const List = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const initialValue = stateCategory.name || Categories[0];
    const [selected, setSelected] = useState<string>(initialValue)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

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
                {Categories.map((name, index)=>(
                    <div className="list-item" key={index} onClick={() => handleChange(name)}>  
                        <i className={`fa-solid fa-check ${selected !== name ? 'color-white' : '' }`}/>
                        <span>{name}</span>
                    </div>
                ))}
            </div>}
        </div>
    )
}