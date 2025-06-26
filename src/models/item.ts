import { Type } from './interfaces';

export interface Item {
    createdAt?: string
    name: string
    category: string 
    type: Type
    amount: string 
}

export type ItemCreated = Pick<Item, 'name' | 'amount' | 'category' | 'createdAt'>
export type ItemCreatedWithoutCategory = Pick<Item, 'name' | 'amount' >