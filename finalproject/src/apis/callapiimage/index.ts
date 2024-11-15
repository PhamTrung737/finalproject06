import api from ".."
import { isApiError } from "../../types/type";

export interface FormDataAddImageBanner extends FormData {
    append(key:"image",value:string|Blob|string,filename?:string):void;
}

export interface FormDataAddImageProduct extends FormData {
    append(key:"image",value:string|Blob|string,filename?:string):void;
    append(key:"idProduct",value:string|Blob|number,filename?:string):void;
}

export const getListImage = async()=>{
    try {
        return await api.get("image/list-image")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const deleteImageById = async(id:number)=>{
    try {
        return await api.delete(`image/delete/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const addImageBanner = async(param:FormDataAddImageBanner)=>{
      try {
        return await api.post("image/add-banner",param)
      } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
      }
}

export const addImageProduct = async(param:FormDataAddImageProduct)=>{
    try {
        return await api.post("image/add-product",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const getImageLogo = async()=>{
    try{
       return await api.get("files/logo")
    }catch(error:unknown){
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const getLogoHome = async()=>{
    try{
         return await api.get("files/logo-home")
    }catch(error:unknown){
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}