import api from ".."
import { isApiError } from "../../types/type";


export interface FormAddType extends FormData {
    append(key:"desc",value:string|Blob|string,filename?:string):void
}

export interface FormUpdateType extends FormData{
    append(key:"desc",value:string|Blob|string,filename?:string):void
    append(key:"id",value:string|Blob|number,filename?:string):void
}

export const getListType = async()=>{
    try {
        return await api.get("type")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const addType = async(param:FormAddType)=>{
    try {
        return api.post("type/add-type",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const updateType = async(param:FormUpdateType)=>{
    try {
        return await api.put("type/update-type",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const deleteType = async(id:number)=>{
    try {
        return await api.delete(`type/delete-type/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}