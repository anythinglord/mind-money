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
    date: string
    description: string
    category: Category
    amount: number
}

export type ItemCreated = Pick<Item, 'description' | 'amount'>