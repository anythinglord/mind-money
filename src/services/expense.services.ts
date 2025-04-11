import { config } from '../config'
import axios from 'axios';

const url = config.API_URL
const activeWorkSpace: string = '67f9274880d73be2ade586aa';

export const getExpenses = async () => {
    
    const response = await axios.get(`${url}/expenses/${activeWorkSpace}` , {
        withCredentials: true
    });
    return response.data;
}

export const createExpense = async (name: string, amount: string, category: string) => {
    
    try {
        const response = await axios.post(`${url}/expenses`,
            { name, amount, category },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw new Error("Error creating expense");
    }
}