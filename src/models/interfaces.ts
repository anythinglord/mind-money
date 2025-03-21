export enum Type {
    Budget= 'Budget',
    Income= 'Income',
    Expenses= 'Expenses',
    Saving= 'Saving'
}
export interface Section  {
    name: string
    icon: string
    value: number | string
}

export interface Item {
    date: string
    description: string | undefined
    category: string 
    type: Type
    amount: number | undefined
}

export type ItemCreated = Pick<Item, 'description' | 'amount' | 'category'>