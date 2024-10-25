import api from ".."


export const getImageLogo = async()=>{
    try{
       return await api.get("files/logo")
    }catch(errror:any){
        throw Error(errror)
    }
}