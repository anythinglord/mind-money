export const isTrue = (expression: any) => {
    return expression ? true : false
}

export const capitalize = (val: string) => 
    String(val).charAt(0).toUpperCase() + String(val).slice(1);

export const concatWithExclude = (exclude: string, data: any[]) => {
    return Object.entries(data)
        .filter(([key, _]) => key !== exclude).map(([_, value]) => value).join('');
}
export const catchError = async <T>(promise: Promise<T>): Promise<[T | null, unknown]> => {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error];
    }
};