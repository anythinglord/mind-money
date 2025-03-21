import { config } from '../config'
import axios from 'axios';

const url = config.API_URL

export const getUsers = async () => {
    const response = await axios.get(`${url}/users`);
    return response.data;
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${url}/users/login`,
            { email, password },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw new Error("Invalid credentials");
    }
}