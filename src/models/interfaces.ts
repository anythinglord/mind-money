export enum Type {
    Budget= 'Budget',
    Income= 'Income',
    Expenses= 'Expenses',
    Saving= 'Saving'
}
export interface Section  {
    name: Type
    icon: string
    amount: number
}

export interface Item {
    date: string
    description: string
    category: string
    type: Type
    amount: number
}

export type ItemCreated = Pick<Item, 'description' | 'amount'>