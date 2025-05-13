import axios from 'axios';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
   baseURL: 'https://hotel-api-latest-p865.onrender.com/v1/api',
  //baseURL: 'http://localhost:8080/v1/api',//descoment for local enviroment
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response.data.message;
    const status = error.response.status;
    switch (status) {
        case 400:
          Swal.fire({
              title: 'Elemento not found',
              text: message,
              icon: 'warning',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;
        case 401:
          Swal.fire({
              title: 'Failed Authentication',
              text: message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;  
        case 409:
           Swal.fire({
              title: 'Element Already Exist',
              text: message,
              icon: 'warning',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;
        case 404:
          Swal.fire({
              title: 'Element not found',
              text: message,
              icon: 'warning',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;
        case 422:
          Swal.fire({
              title: 'Field Error',
              text: "Error in some field validation",
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;
        case 500:
          Swal.fire({
              title: 'Unexpected error',
              text: 'Something happened',
              icon: 'error',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
          break;
        default:
           Swal.fire({
              title: 'Unexpected error',
              text: 'Something happened',
              icon: 'error',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded',
              }
            });
      }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true;
      refreshToken(originalRequest);
      
    }

    

    return Promise.reject(error);
  }
);

const refreshToken=async (originalRequest)=>{
  try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post('http://localhost:8080/v1/api/auth/refresh-token', {
          refreshToken,
        });

        const newToken = res.data.token;
        localStorage.setItem('token', newToken);

        // Actualizar el header y reintentar
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error al refrescar el token', refreshError);
        localStorage.clear();
        window.location.href = '/login'; // O usar logout() si tienes contexto
        return Promise.reject(refreshError);
      }

}

export default axiosInstance;
