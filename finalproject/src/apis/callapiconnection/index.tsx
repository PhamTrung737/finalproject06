import api from "..";
import { isApiError } from "../../types/type";


export interface FormAddConnection extends FormData{
    append(key:"file",value:string|Blob|string,filename?:string):void;
    append(key:"name",value:string|Blob|string,filename?:string):void;
}

export type ParamUpdateConnection ={
    id:number,
    formData:FormAddConnection
}

export const getListConnection = async()=>{
    try{
         return await api.get("connection")
    }catch(error:unknown){
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const addConnection  =async(param:FormAddConnection)=>{
    try {
        return await api.post("connection/add-connection",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const deleteConnetion = async(id:number)=>{
    try {
        return await api.delete(`connection/delete-connection/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const updateConnection = async(param:ParamUpdateConnection)=>{
    try {
        return await api.put(`connection/update-connetion/id=${param.id}`,param.formData)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}