import { useDispatch, useSelector } from "react-redux"
import { setCategory, setFilterCategory } from "../../redux/states/category"
import { AppStore } from "../../redux/store"
import { List } from "./List"
import { getCategoriesByMode } from "../../utils"
import { Categories } from "../../data"

export const ContainerCategoriesList = () => {
    
    const stateCategory = useSelector((store: AppStore) => store.category)
    const stateExpenses = useSelector((store: AppStore) => store.expenses)
    const isFilterMode = stateExpenses.mode === 'none'
    const initialValue = isFilterMode ? stateCategory.filterName : stateCategory.name;

    const dispatch = useDispatch()
    const handleChange = (name: string) => {
        if (isFilterMode) {
            dispatch(setFilterCategory(name))
        } else {
            dispatch(setCategory(name))
        }
    }
    
    return(
        <List
            items={getCategoriesByMode(Categories, isFilterMode)}
            initialValue={initialValue} 
            onItemSelected={handleChange}/>
    )
}