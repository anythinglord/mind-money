import { Avatar } from '../../components/Avatar/Avatar';
import './HomePage.css'

const HomePage = () => {
    return(
        <div className='index-home'>
            <div className="navbar">
                <div className="logo">
                    Mind Money
                </div>
                <div className="navigation">
                    <a>Expenses</a>
                    <a>Budget</a>
                    <a>Goals</a>
                    <a>Reports</a>
                </div>
                <Avatar />
            </div>
        </div>
    )
}

export default HomePage;