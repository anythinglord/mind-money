export const isTrue = (expression: any) => {
    return expression ? true : false
}

export const capitalize = (val: string) => 
    String(val).charAt(0).toUpperCase() + String(val).slice(1);