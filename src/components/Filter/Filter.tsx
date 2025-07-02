import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../Button'
import { dialogOpenSubject$ } from '../Dialog'
import { List } from '../List'
import { changeMode, setSearchName } from '../../redux/states'
import { AppStore } from '../../redux/store'
import './index.css'

export const Filter = () => {

    const dispatch = useDispatch()
    const stateCategory = useSelector((store: AppStore) => store.category)
    const searchName = stateCategory.searchName
    
    const handleClick = () => {
        // open dialog
        dispatch(changeMode('create'))
        dialogOpenSubject$.setSubject = true;
    }

    const handleChangeName = (searchName: string): void => {
        dispatch(setSearchName(searchName))
    }

    return (
        <div className="filter-index">
            <div className='filter-items'>
                <List />
                <Button label='Add Expense' handleClick={handleClick} />
            </div>
            <div className='filter-items filter-search'>
                <i className='fa-solid fa-search' />
                <input
                    value={searchName}
                    onChange={(e) => handleChangeName(e.target.value)}
                    type='search' placeholder='Search expenses...' />
            </div>
        </div>
    )
}