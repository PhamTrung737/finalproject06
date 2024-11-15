

import api from ".."
import { isApiError, Param } from "../../types/type"

export interface FormDataAddProduct extends FormData{
     append(key:"price",value:string|Blob|number,fileName?:string):void;
     append(key:"description",value:string|Blob,fileName?:string):void;
     append(key:"name",value:string|Blob,fileName?:string):void;
     append(key:"idType",value:string|Blob|number,fileName?:string):void;
     append(key:"size",value:string|Blob,fileName?:string):void;
     append(key:"idMaterial",value:string|Blob|number,fileName?:string):void;
     append(key:"idCategory",value:string|Blob|number,fileName?:string):void;
     
}

export interface FormDataUpDateProduct{
    id:number,
    formData:FormDataAddProduct
}

export interface IdConnection extends FormData{
    append(key:"idConnection" ,value:string|Blob|number,fileName?:string):void
}

export interface FormDataUpdateProductByIdConnection{
    id:number,
    formData :IdConnection
}

export const getProductByParam = async(param:Param)=>{
    try{
        return await api.get(`product${param.type}/${param.page}/${param.pageSize}`)
    }catch(error:unknown){
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const getProductDetail = async(id:number)=>{
    try {
      return await api.get(`product/id=/${id}`)  
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const getProductByIdConnection = async(param:Param) =>{
    try {
        return await api.get(`product/connection/id=${param.id}/page=${param.page}/pagesize=${param.pageSize}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const getListProductByRoleAdmin = async()=>{
    try {
        return await api.get("product/list-product-admin")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const addProductByRoleAdmin = async(param:FormDataAddProduct)=>{
    try {
        return await api.post("product",param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const updateProductById = async(param:FormDataUpDateProduct)=>{
    try {
        return api.post(`product/update/id=${param.id}`,param.formData)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const updateProductByIdConnection = async(param:FormDataUpdateProductByIdConnection)=>{
    try {
        return await api.post(`product/update/connection/id=${param.id}`,param.formData)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}


export const deleteProductById = async(id:number)=>{
    try {
        return await api.post(`product/delete/${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}