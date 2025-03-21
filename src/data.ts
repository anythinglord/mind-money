import { Section } from './models/interfaces';

export const HomeCardSections: Section[] = [
    { name: 'Total Budget', icon: 'wallet', value: 5000 },
    { name: 'Total Income', icon: 'dollar-sign', value: 6000 },
    { name: 'Total Expenses', icon: 'signal', value: 5000 },
    { name: 'Total Savings', icon: 'pie-chart', value: 5000 }
]

export const Categories: string[] = [
    'All categories', 'Food', 'Utilities', 'Transportation', 'Entertainment'
]

export const ExpensesCardSections: Section[] = [
    { name: 'Total Expenses', icon: 'dollar-sign', value: 5000 },
    { name: 'Highest Category', icon: 'pie-chart', value: 'Food' },
    { name: 'This Month', icon: 'signal', value: 5000 },
]