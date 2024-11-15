import api from ".."
import { isApiError } from "../../types/type";

export const getListCategory = async()=>{
    try {
        return await api.get("category")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}