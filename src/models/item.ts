import { Type } from './interfaces';

export interface Item {
    date: string
    description: string | undefined
    category: string 
    type: Type
    amount: number | undefined
}

export type ItemCreated = Pick<Item, 'description' | 'amount' | 'category'>
export type ItemCreatedWithoutCategory = Pick<Item, 'description' | 'amount' >