import { Table } from '../../components/Table/Table';
import './index.css'
import { NavBar } from '../../components/NavBar/NavBar';
import { CardList } from '../../components/CardList';
import { HomeCardSections } from '../../data';

const HomePage = () => {

    return(
        <div className='index-home'>
            <NavBar />
            <div className="page-content">
                <div className="page-title">
                    Financial Summary
                </div>
                <CardList data={HomeCardSections} />
                <h2 className='page-subtitle'>Recent Transactions</h2>
                <Table data={[]} />
            </div>
        </div>
    )
}

export default HomePage;