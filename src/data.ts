import { Section, Type } from './models/interfaces';

export const HomePageSections: Section[] = [
    { name: Type.Budget, icon: 'wallet', amount: 5000 },
    { name: Type.Income, icon: 'dollar', amount: 6000 },
    { name: Type.Expenses, icon: 'wallet', amount: 5000 },
    { name: Type.Saving, icon: 'wallet', amount: 5000 }
]

export const Categories: string[] = [
    'All categories', 'Food', 'Utilities', 'Transportation', 'Entertainment'
]