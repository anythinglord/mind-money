import { Button } from "../../components/Button"
import { Card, CardList } from "../../components"
import { IncomeCreator } from "../../components/Creator/IncomeCreator"
import { Dialog, dialogOpenSubject$ } from "../../components/Dialog"
import { NavBar } from "../../components/NavBar"
import { useBudget } from "../../hooks/useBudget"
import "./index.css"

export const BudgetPage = () => {

    const { stats } = useBudget()

    const handleClick = () => {
        dialogOpenSubject$.setSubject = true;
    }

    return (
        <div className="page-index">
            <NavBar />
            <Dialog title="Create Income">
                <IncomeCreator />
            </Dialog>
            <div className="page-content">
                <div className="budget-header">
                    <div className="page-title">Budget Overview</div>
                    <div className="budget-item">
                        <Button label="Add Income" handleClick={handleClick} />
                    </div>
                </div>
                <CardList data={stats} />
                <div className="page-title">Income Sources</div>
                <div className="budget-sources">
                    <Card title="Salary" date="2025-11-28" value={5000} type="income" />
                    <Card title="Salary" date="2025-11-28" value={5000} type="income" />
                </div>
            </div>
        </div>
    )
}