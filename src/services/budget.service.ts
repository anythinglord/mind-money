import axios from "axios";
import { Income } from "../models";
import { config } from '../config'

const url = config.API_URL

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