import { Table } from '../../components/Table';
import './index.css'
import { NavBar } from '../../components/NavBar';
import { CardList } from '../../components/CardList';
import { HomeCardSections } from '../../data';

export const HomePage = () => {

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