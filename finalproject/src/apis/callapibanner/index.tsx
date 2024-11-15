import api from ".."
import { isApiError } from "../../types/type";

export const getBanner = async()=>{
    try{
         return await api.get("files/banner")
    }catch(error:unknown){
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}