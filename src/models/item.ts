import { Type } from './interfaces';

export interface Item {
    date: string
    name: string
    category: string 
    type: Type
    amount: string 
}

export type ItemCreated = Pick<Item, 'name' | 'amount' | 'category'>
export type ItemCreatedWithoutCategory = Pick<Item, 'name' | 'amount' >