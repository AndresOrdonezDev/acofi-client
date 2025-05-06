import {isAxiosError} from 'axios'
import api from '../lib/axios'
import { userSchema, type UserLoginForm } from '../types'


export async function authenticateUser(formData:UserLoginForm){
    try {
        const {data} = await api.post<string>("/auth/login",formData)
        localStorage.setItem('token_acofi',data)      
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }

}

export async function getUser() {
    try {
        const {data} = await api.get('/auth/user')
        const response = userSchema.safeParse(data)
        console.log(response);
        
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}