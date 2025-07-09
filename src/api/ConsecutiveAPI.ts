import {isAxiosError} from 'axios'
import api from '../lib/axios'
import { userConsecutiveArraySchema, userConsecutiveByIdSchema, type RequestConsecutiveForm, type userConsecutive, type UserConsecutiveById } from '../types'

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
        const response = userConsecutiveArraySchema.safeParse(data)
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
export async function getAllConsecutive(){
    try {
        const {data} = await api.get("/consecutive")
        
        const response = userConsecutiveArraySchema.safeParse(data)
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

export async function getConsecutiveById(id:number){
    try {
        const {data} = await api.get(`/consecutive/${id}`)
        
        const response = userConsecutiveByIdSchema.safeParse(data)
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

export async function updateConsecutive({id,consecutive,requestedBy,addressee,topic}:UserConsecutiveById){
    try {
        const {data} = await api.put<string>(`/consecutive/${id}`,{consecutive,requestedBy,addressee,topic})
       return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}
export async function deleteConsecutive(id:userConsecutive['id']){
    try {
        const {data} = await api.post<string>(`/consecutive/${id}`)
       return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw error;
    }
}