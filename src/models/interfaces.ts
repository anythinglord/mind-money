export enum Type {
    Budget= 'Budget',
    Income= 'Income',
    Expenses= 'Expenses',
    Saving= 'Saving'
}

export enum Recurrence {
    ONE = 'One time',
    MONTLY ='Monthly',
    ANNUALY ='Annually'
}
export interface Section  {
    name: string
    icon: string
    value: number | string
}

export type LoginMode = 'login'| 'signup' | 'forgot'