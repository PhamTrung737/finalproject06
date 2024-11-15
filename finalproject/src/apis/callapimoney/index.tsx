import { isApiError } from '../../types/type';
import api from '../index'


export const getListMoney = async()=>{
    try {
        return await api.get("money")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}