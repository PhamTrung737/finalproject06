import api from ".."


export const getListProductInCartByUser = async(id:number)=>{
    try {
        return await api.get(`cart/id=${id}`)
    } catch (error:any) {
        throw Error(error)
    }

}