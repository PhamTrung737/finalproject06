import api from "..";

export const getListConnection = async()=>{
    try{
         return await api.get("connection")
    }catch(error:any){
        throw Error(error);
    }
}