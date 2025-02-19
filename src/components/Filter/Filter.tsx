import { Button } from '../Button/Button'
import { List } from '../List'
import './index.css'

export const Filter =() => {
    return(
        <div className="filter-index">
            <div className='filter-items'>
                <List label="All categories" />
                <Button label='Add Expense'></Button>
            </div>
            <div className='filter-items filter-search'>
                <i className='fa-solid fa-search' />
                <input type='search' placeholder='Search expenses...'/>
            </div>
        </div>
    )
}