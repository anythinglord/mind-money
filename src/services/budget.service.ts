import axios from "axios";
import { Income } from "../models";
import { config } from '../config'
import { catchError } from '../utils';

const url = config.API_URL
const activeWorkSpace: string = '67f9274880d73be2ade586aa';

export const getIncomes = async () => {

    console.log('getIncomes called')
    const request = axios.get(`${url}/budget/${activeWorkSpace}`, {
        withCredentials: true
    });
    const [response, error] = await catchError(request)
    if (error) {
        console.error("Error getting incomes:", error);
        throw new Error("Error getting incomes");
    }
    return response?.data;
}

export const createIncome = async (data: Income) => {

    try {
        const response = await axios.post(`${url}/budget`,
            {
                name: data.name, amount: data.amount,
                recurrence: data.recurrence, validAt: data.validAt
            },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw new Error("Error creating expense");
    }
}

export const getBudgetStats = async () => {

    const request = axios.get(`${url}/budget/stats/${activeWorkSpace}`, {
        withCredentials: true
    });
    const [response, error] = await catchError(request)
    if (error) {
        console.error("Error getting budget stats:", error);
        throw new Error("Error getting budget stats");
    }
    return response?.data;
}