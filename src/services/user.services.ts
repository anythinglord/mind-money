import { config } from '../config'
import axios from 'axios';

const url = config.API_URL

export const getUsers = async () => {
    const response = await axios.get(`${url}/users`, {
        withCredentials: true
    });
    return response.data;
}

export const verifySession = async () => {
    try {
        const response = await axios.get(`${url}/users/verify_session`, {
            withCredentials: true
        });
        return response.data
    } catch (error) {
        throw new Error("Invalid session");
    }
}

export const verifyEmail = async (email: string) => {
    try {
        console.log('verifying email', email)
        const response = await axios.post(`${url}/users/verify_email`,
            { email },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        throw new Error("Account not found");
    }  
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${url}/users/login`,
            { email, password },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

export const signup = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${url}/users/signup`,
            { email, password },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        console.error("Signup failed:", error);
        throw new Error("Internal error ");
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${url}/users/logout`)
        return response.data;
    } catch (error) {
        //console.error("Logout failed:", error);
        throw new Error("Internal error");
    }
}