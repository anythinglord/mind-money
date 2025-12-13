import { useMemo } from "react"
import { Button } from "../../components/Button"
import { Card, CardList } from "../../components"
import { IncomeCreator } from "../../components/Creator/IncomeCreator"
import { Dialog, dialogOpenSubject$ } from "../../components/Dialog"
import { NavBar } from "../../components/NavBar"
import { useBudget } from "../../hooks/useBudget"
import "./index.css"

export const BudgetPage = () => {

    const { stats, getQueryIncomes } = useBudget()
    const { data } = getQueryIncomes

    const handleClick = () => {
        dialogOpenSubject$.setSubject = true;
    }

    const Incomes = useMemo(() => {
        if (!data) return null

        return data.incomes.map((income: any, index: number) => (
            <Card
                key={index}
                title={income.name}
                date={income.validAt || income.createdAt}
                value={Number(income.amount)}
                type="income"
            />
        ))
    }, [data])

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
                    {Incomes}
                </div>
            </div>
        </div>
    )
}