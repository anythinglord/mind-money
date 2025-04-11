import { Type } from './interfaces';

export interface Item {
    date: string
    description: string
    category: string 
    type: Type
    amount: string 
}

export type ItemCreated = Pick<Item, 'description' | 'amount' | 'category'>
export type ItemCreatedWithoutCategory = Pick<Item, 'description' | 'amount' >