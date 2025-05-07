import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";
import { getAllConsecutive, getUserConsecutive } from "../api/ConsecutiveAPI";

export const useAuth = ()=>{
    
    const {data, isError, isLoading} = useQuery({
        queryKey:['user'],
        queryFn:getUser,
        retry:1,
        refetchOnWindowFocus:false
    })

    return{
        data, isError, isLoading
    }
}
export const useGetUserConsecutives = ()=>{
    
    const {data, isError, isLoading} = useQuery({
        queryKey:['userConsecutives'],
        queryFn:getUserConsecutive,
        retry:1,
        refetchOnWindowFocus:false
    })

    return{
        data, isError, isLoading
    }
}
export const useGetAllConsecutives = ()=>{
    
    const {data, isError, isLoading} = useQuery({
        queryKey:['userConsecutives'],
        queryFn:getAllConsecutive,
        retry:1,
        refetchOnWindowFocus:false
    })

    return{
        data, isError, isLoading
    }
}