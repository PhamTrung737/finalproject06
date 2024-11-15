
import api from ".."
import { isApiError } from "../../types/type";
import { FormAddType, FormUpdateType } from "../callapitype";

export const getListMaterial = async()=>{
    try {
        return await api.get("material")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const addMaterial = async(param:FormAddType)=>{
    try {
        return api.post("material/add-material",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const updateMaterial = async(param:FormUpdateType)=>{
    try {
        return await api.put("material/update-material",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const deleteMaterial = async(id:number)=>{
    try {
        return await api.delete(`material/delete-material/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}