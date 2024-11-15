import api from ".."
import { isApiError } from "../../types/type";


export interface FormDataComment extends FormData {
    append(key:"content",value:string|Blob|string ,filename?:string):void;
    append(key:"evaluate",value:string|Blob|number ,filename?:string):void;
    append(key:"idUser",value:string|Blob|number ,filename?:string):void;
    append(key:"idProduct",value:string|Blob|number ,filename?:string):void;
    append(key:"createDay",value:string|Blob|number ,filename?:string):void;
    
}



export const getLitsCommentByIdProduct = async(id:number)=>{
    try {
        return await api.get(`comment/product/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const addCommentByIdUser = async(param:FormDataComment)=>{
     try {
        return await api.post("comment/add-comment",param)
     } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
     }
}