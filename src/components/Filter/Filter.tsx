import { Button } from '../Button'
import { dialogOpenSubject$ } from '../Dialog'
import { List } from '../List'
import './index.css'

export const Filter =() => {

    const handleClick = () => {
        // open dialog
        dialogOpenSubject$.setSubject = true;
    }

    return(
        <div className="filter-index">
            <div className='filter-items'>
                <List />
                <Button label='Add Expense' handleClick={handleClick} />
            </div>
            <div className='filter-items filter-search'>
                <i className='fa-solid fa-search' />
                <input type='search' placeholder='Search expenses...'/>
            </div>
        </div>
    )
}