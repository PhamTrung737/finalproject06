import api from "..";
import { isApiError, UserSignIn, UserSignUp } from "../../types/type";

export const signIn = async(user:UserSignIn)=>{
    try {
        return await api.post("authen/login",user);
    } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
    }
}

export const singUp = async(user:UserSignUp)=>{
      try {
         return await api.post("authen/signup",user)
      } catch (error:unknown) {
        if (isApiError(error)) {
        
            if (error.response?.data?.message) {
               throw new Error(error.response.data.message);
            }
         }
         throw new Error("An unexpected error occurred");
      }
}