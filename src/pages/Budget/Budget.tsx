import { CardList } from "../../components/CardList"
import { NavBar } from "../../components/NavBar"
import { useBudget } from "../../hooks/useBudget"

export const BudgetPage = () => {

    const { stats } = useBudget() 
    return(
        <div className="page-index">
            <NavBar />
            <div className="page-content">
                <div className="page-title">
                    Budget Overview
                </div>
                <CardList data={stats}/>
            </div>
        </div>
    )
}