import api from ".."
import { Param } from "../../types/type"



export const getProductByParam = async(param:Param)=>{
    try{
        return await api.get(`product${param.type}/${param.page}/${param.pageSize}`)
    }catch(error:any){
        throw Error(error)
    }
}


export const getProductDetail = async(id:number)=>{
    try {
      return await api.get(`product/id=/${id}`)  
    } catch (error:any) {
        throw Error(error)
    }
}


export const getProductByIdConnection = async(param:Param) =>{
    try {
        return await api.get(`product/connection/id=${param.id}/page=${param.page}/pagesize=${param.pageSize}`)
    } catch (error:any) {
        throw Error(error)
    }
}