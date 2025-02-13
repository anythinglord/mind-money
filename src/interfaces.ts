export enum Category {
    Budget= 'Budget',
    Income= 'Income',
    Expenses= 'Expenses',
    Saving= 'Saving'
}
export interface Section  {
    name: Category
    icon: string
    amount: number
}

export interface Item {
    Date: string
    description: string
    category: Category
    amount: number
}