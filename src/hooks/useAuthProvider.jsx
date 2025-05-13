import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { loginService, registerService, getUserService } from "../services/authService";
export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [responseMesagge,setResponseMesagge] = useState(null); 

  useEffect(() => {
    const initAuth = async () => {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      try {
        if (token && email) {
          setToken(token);
          setEmail(email);
          await getUserData(email);
        } 
      } catch (error) {
        logout(); 
      } finally {
        setLoading(false);
      }
    };
  
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginService(credentials);
      const { token, refreshToken } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('email', credentials.email);
      setToken(token);
      setEmail(credentials.email);
      getUserData(credentials.email );
    } catch (e) {
      setError(e.response.data);
    }
  };

  const getUserData = async (email) => {
    try {
      const response = await getUserService(email);
      setUser(response.data.data);
    } catch (e) {
      console.error("ERROR AL OBTENER DATOS DE USUARIO:");
      console.error("e.response:", e.response);
      console.error("e.config:", e.config);
      console.error("e.message:", e.message);
    } finally {
      setLoading(false);
    }
  };
  

  const userRegister = async(user)=>{
    try{
      const response = await registerService(user);
      setResponseMesagge(response.data);
    }catch(e){
      console.log(e);
      setError(e.response.data);
    }
  };

  const resetMessages = ()=>{
    setResponseMesagge(null);
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email');
    setToken(null);
    setUser(null);
    setEmail(null);
  };

  return { user, token, login, logout, userRegister, resetMessages,loading, error,responseMesagge };
};

