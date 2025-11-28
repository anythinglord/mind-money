import { Type, Recurrence } from './interfaces';

export interface Item {
    id?: string
    name: string
    category: string 
    type: Type
    recurrence?: Recurrence
    amount: string
    updatedAt?: string
    validAt?: string
    createdAt?: string
    workSpaceId?: string 
}

export type ItemCreated = Pick<Item, 'name' | 'amount' | 'category' | 'createdAt'| 'validAt' | 'recurrence'>
export type ItemToModify = Pick<Item, 'id'| 'category' > & Partial<Pick<Item, 'name' | 'amount'>>
export type ItemCreatedWithoutCategory = Pick<Item, 'name' | 'amount' >
export type Income = Pick<Item, 'name' | 'amount' | 'createdAt'| 'validAt' | 'recurrence'>