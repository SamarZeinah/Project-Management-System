import axios from "axios";
export const baseUrl="https://upskilling-egypt.com:3006/api/v1";

//public    Dont need Token
export const publicAxiosInstance=axios.create({
    baseURL:baseUrl,
})
//private   need Token after login
export const privateAxiosInstance=axios.create({
    baseURL:baseUrl,
    headers: { Authorization: localStorage.getItem('token') }
})