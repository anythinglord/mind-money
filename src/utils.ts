import { Categories } from "./data";
import { Item } from "./models";

export const isTrue = (expression: any) => {
    return expression ? true : false
}

export const formatDate = (date: string | undefined) => {
    return date?.slice(0,10)
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

/**
 * @param {Item []} items
 * @param {string} category
 * 
 * Returns a shallow copy filtered by category name
 */

export const filterItemsByCategory = (items: Item[], category: string) => {
    if (category === 'All categories') {
        return items
    }
    const filteredItems = [...items]
    return filteredItems.filter((item) => item.category === category)
}

/**
 * @param {Item []} items
 * @param {string} searchName
 * 
 * Returns a shallow copy filtered by search name
 */

export const filterItemsBySearchName = (items: Item[], searchName: string) => {
    if (searchName === ''){
        return items
    }
    const filteredItems = [...items]
    return filteredItems.filter((item) => item.name.includes(searchName))
}

/**
 * Replace an existing item in array 
 * @param {Item []} items 
 * @param {number} index 
 * @param {Item} newItem 
 * @returns {Item []}
 */
export const replaceItemByIndex = (items: Item[], index: number, newItem: Item) => {
    const newItems = [...items]
    newItems.splice(index, 1, newItem)
    return newItems
}

export const getIndex = (items: Item[], item: Item) => {
    return items.findIndex(inner => inner.id === item.id)
}

/**
 * Get correct expense's categories according to the mode
 * @param {string []} categories 
 * @param {boolean} isFilterMode 
 * @returns {string []}
 */
export const getCategoriesByMode = (categories: string[], isFilterMode: boolean) => {
    return isFilterMode ? categories : Categories.filter(category => category !== 'All categories')
}