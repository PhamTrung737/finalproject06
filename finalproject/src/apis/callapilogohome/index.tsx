import api from "..";

export const getLogoHome = async()=>{
    try{
         return await api.get("files/logo-home")
    }catch(error:any){
        throw Error(error);
    }
}