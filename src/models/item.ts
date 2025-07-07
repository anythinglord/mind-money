import { Type } from './interfaces';

export interface Item {
    id?: string
    createdAt?: string
    name: string
    category: string 
    type: Type
    amount: string
    updatedAt?: string
    workSpaceId?: string 
}

export type ItemCreated = Pick<Item, 'name' | 'amount' | 'category' | 'createdAt'>
export type ItemToModify = Pick<Item, 'id'| 'category' > & Partial<Pick<Item, 'name' | 'amount'>>
export type ItemCreatedWithoutCategory = Pick<Item, 'name' | 'amount' >