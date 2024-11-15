import { isApiError } from '../../types/type'
import api from '../index'
export type  UpdateCarts={
    idProduct:number,
    quantity:number,
    createDay:string
} 
export type ParamUpdateCarts = {
    param:UpdateCarts[],
    id_user:number,
    id_money:number,
    id_payment:number
}



export interface ParamCheckOutCart extends FormData{
    append(key: "idUser", value: string | Blob | number, fileName?: string): void;
    append(key: "idCart", value: string | Blob | number, fileName?: string): void;
}

export const getListProductInCartByUser = async(id:number)=>{
    try {
        return await api.get(`cart/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }

}

export const updateProductInCartByIdUSer = async(param:ParamUpdateCarts)=>{
    try {
        return await api.post(`cart/add-product/user=${param.id_user}/payment=${param.id_payment}/money=${param.id_money}`,param.param)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const getListPayment = async()=>{
    try {
        return await api.get("payment")
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const checkOutCartByIdUserAndIdCart = async(param:ParamCheckOutCart)=>{
      try {
          return await api.post("cart/payment-cart",param);
      } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
      }
}

export const getProductInCartByIdUser = async(id:number)=>{
    try {
        return await api.get(`cart/list-product/id=${id}`)
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}