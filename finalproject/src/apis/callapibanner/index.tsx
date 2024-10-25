import api from ".."

export const getBanner = async()=>{
    try{
         return await api.get("files/banner")
    }catch(error:any){
        throw Error(error)
    }
}