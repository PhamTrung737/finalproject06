import api from ".."

export const getListMoney = async()=>{
    try {
        return await api.get("money")
    } catch (error:any) {
        throw Error(error)
    }
}