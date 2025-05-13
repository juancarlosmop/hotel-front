import axiosInstance from "./axiosInstance";

export const login=(credentials)=> axiosInstance.post('/auth/login', credentials);

export const  register=(user)=> axiosInstance.post('/auth/register',user)

export const getUser=(email)=>axiosInstance.get(`/user/profile/${email}`);