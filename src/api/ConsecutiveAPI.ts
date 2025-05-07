import {isAxiosError} from 'axios'
import api from '../lib/axios'
import { userConsecutiveArraySchema, type RequestConsecutiveForm } from '../types'

export async function requestConsecutive(formData:RequestConsecutiveForm){
    try {
        const {data} = await api.post<string>("/consecutive",formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }

}
export async function getUserConsecutive(){
    try {
        const {data} = await api.get("/consecutive/list")
        console.log(data);
        const response = userConsecutiveArraySchema.safeParse(data)
        if(response.success){
            return data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }

}
export async function getAllConsecutive(){
    try {
        const {data} = await api.get("/consecutive")
        console.log(data);
        const response = userConsecutiveArraySchema.safeParse(data)
        if(response.success){
            return data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }

}