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

export const forgotPassword = async (email: string, refresh: boolean) => {
    try {
        const response = await axios.post(`${url}/users/forgot_password`,
            { email, refresh },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        throw new Error("Error verifying email");
    }  
}

export const verifyOTP = async (email: string, token: string) => {
    try {
        const response = await axios.post(`${url}/users/verify_otp`,
            { email, token },
            { withCredentials: true }
        )
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message)
            } 
          }
        //throw new Error("Error verifying otp");
    }  
}

export const resetPassword = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${url}/users/reset_password`,
            { email, password },
            { withCredentials: true }
        )
        return response.data
    } catch (error: unknown) {
        throw new Error("Server Error");
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
        const response = await axios.get(`${url}/users/logout`, { withCredentials: true })
        return response.data;
    } catch (error) {
        //console.error("Logout failed:", error);
        throw new Error("Internal error");
    }
}