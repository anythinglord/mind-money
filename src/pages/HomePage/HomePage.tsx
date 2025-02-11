import { useState } from 'react';
import { Avatar } from '../../components/Avatar/Avatar';
import { Creator } from '../../components/Creator/Creator';
import { Dialog } from '../../components/Dialog/Dialog';
import './HomePage.css'
import { IconButton } from '../../components/IconButon/IconButton';

const HomePage = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const handeOpenDialog = () => setOpenDialog(prevState => !prevState)
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
            <Dialog open={openDialog} setOpen={handeOpenDialog}>
                <Creator />
            </Dialog>
            <div className="home-content">
                <div className="home-title">
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
                <div className="position-end">
                    <IconButton type="plus" size="lx" handleClick={handeOpenDialog}/>    
                </div>
            </div>
        </div>
    )
}

export default HomePage;