import { useDispatch, useSelector } from "react-redux"
import { List } from "./List"
import { getRecurrences } from "../../utils"
import { setRecurrence } from "../../redux/states/recurrence"
import { AppStore } from "../../redux/store"

export const ContainerRecurrenciesList = () => {
    
    const stateRecurrence = useSelector((store: AppStore) => store.recurrence)
    const dispatch = useDispatch()
    const handleChange = (name: string) => {
        dispatch(setRecurrence(name))
    }
    
    return(
        <List
            items={getRecurrences()}
            initialValue={stateRecurrence.name} 
            onItemSelected={handleChange}/>
    )
}