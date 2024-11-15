import api from ".."
import { ApiError, isApiError } from "../../types/type";



export interface FormDataUpdatUser extends FormData {
     append(key:"id",value:string | Blob|number ,filename?:string):void;
     append(key:"fullName",value:string|Blob|string,filename?:string):void;
     append(key:"idRole",value:string|Blob|number,filename?:string):void;
}
export interface FormDateUpdateAvatar extends FormData{
   append(key:"file",value:string|Blob|string,filename?:string):void;
}
export type ParamUpdatAvatar = {
    idUsser:number;
    formData:FormDateUpdateAvatar
}

export interface FormChangePass extends FormData{
   append(key:"id",value:string|Blob|number,filename?:string):void;
   append(key:"email",value:string|Blob|string,filename?:string):void;
   append(key:"oldPass",value:string|Blob|string,filename?:string):void;
   append(key:"newPass",value:string|Blob|string,filename?:string):void;
}

export interface FormLogOutAll extends FormData{
   append(key:"id",value:string|Blob|number,filename?:string):void;
   append(key:"newPass",value:string|Blob|string,filename?:string):void;
}

export const getListUser = async()=>{
     try {
        return await api.get("user/list-user")
     } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
     }
}

export const updateUserById = async(param:FormDataUpdatUser)=>{
   try {
      return api.post("user/update-user",param)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}

export const deleteUserById = async(id:number)=>{
   try {
      return await api.delete(`user/delete/:${id}`)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}


export const updateAvatarByUserId  = async(param:ParamUpdatAvatar)=>{
   try {
      return await api.post(`user/upload-avatar/id=${param.idUsser}`,param.formData)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}

export const getUserById = async(id:number)=>{
   try {
      return await api.get(`user/detail-user/id=${id}`)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}


export const changePassword = async(param:FormChangePass)=>{
   try {
      return await api.post("authen/change-pass",param)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}

export const logOutAllBrowser = async(param:FormLogOutAll)=>{
   try {
      return await api.put(`user/log-out-all`,param)
   } catch (error:unknown) {
      if (isApiError(error)) {
        
         if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
         }
      }
      throw new Error("An unexpected error occurred");
   }
}