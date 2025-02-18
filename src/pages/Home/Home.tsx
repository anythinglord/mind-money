import { Table } from '../../components/Table/Table';
import './index.css'
import { NavBar } from '../../components/NavBar/NavBar';

const HomePage = () => {

    return(
        <div className='index-home'>
            <NavBar />
            <div className="page-content">
                <div className="page-title">
                    Financial Summary
                </div>
                <div className="home-summary">
                    <div className='home-card'>
                        <div className="card-header">
                            <span>Total Budget</span>
                            <i className="fa-solid fa-wallet" />
                        </div>
                        <div className="card-value">$5,000</div>
                    </div>
                    <div className='home-card'>
                        <div className="card-header">
                            <span>Total Income</span>
                            <i className="fa-solid fa-dollar-sign" />
                        </div>
                        <div className="card-value">$6,300</div>
                    </div>
                    <div className='home-card'>
                        <div className="card-header">
                            <span>Total Expenses</span>
                            <i className="fa-solid fa-signal" />
                        </div>
                        <div className="card-value">$6,300</div>
                    </div>
                    <div className='home-card'>
                        <div className="card-header">
                            <span>Total Savings</span>
                            <i className="fa-solid fa-pie-chart" />
                        </div>
                        <div className="card-value">$6,300</div>
                    </div>
                </div>
                <Table data={[]} />
            </div>
        </div>
    )
}

export default HomePage;