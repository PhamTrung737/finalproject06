


import axios from "axios";


const  VITE_APP_BASE_API= "http://localhost:8080/";

const isTokenExpired=(token:string)=> {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = payload.exp * 1000; 
  return Date.now() >= expirationTime;
}
const api = axios.create({
  baseURL: VITE_APP_BASE_API,
});

api.interceptors.request.use((config: any) => {
  const userLocal = localStorage.getItem("user");
 
  const currentUSer = userLocal ? JSON.parse(userLocal) : null;
  const isLoginToken:boolean =  currentUSer ? isTokenExpired(currentUSer.token):false;
  if(isLoginToken){
    localStorage.removeItem("user")
  }
 
  config.headers = {
    ...config.headers,
    Authorization: currentUSer ? `Bearer ${currentUSer.token}` : "",
    
  };
  return config;
});




export default api;