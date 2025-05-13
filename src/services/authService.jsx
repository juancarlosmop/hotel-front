import * as authApi from '../api/authApi';

export const loginService=async(credentials)=>{
    const response=await authApi.login(credentials);
    return response.data;

};

export const registerService=async(user)=>{
    await authApi.register(user);
};

export const getUserService=async(email)=>{
    const user= await authApi.getUser(email);
    return user;
};