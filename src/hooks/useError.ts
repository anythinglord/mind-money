import { useReducer } from "react"

interface Error {
    error: boolean
    message: string
}

const initialState: Error = {
    error: false,
    message: ''
}   

type State = {
    [key: string]: any; 
};
  
type Action = {
    field: string;
    value: any;
};

export const useError = () => {
    const reducer = (state: State, { field, value }: Action) => {
        return {...state, [field]: value}
    }

    const [filters, dispatch] = useReducer(reducer, initialState)
    const dispatchField = (field: string, value: any) => {
        dispatch({ field: field, value: value })
    }

    return {
        dispatchField: dispatchField,
        filters: filters
    }
}