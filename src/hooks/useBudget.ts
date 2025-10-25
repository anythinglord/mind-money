import { useState } from "react"
import { mockBudgetStats } from '../data'

export const useBudget = () => {
    const [stats, _] = useState(mockBudgetStats)

    return {
        stats: stats
    }
}