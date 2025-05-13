import axiosInstance from "./axiosInstance";
export const  getRooms=()=>   axiosInstance.get("/room");
export const  getRoomById=(id)=> axiosInstance.get(`/room/${id}`);
export const saveRoom=(room)=> axiosInstance.post('/admin/rooms', room, {
    headers: {
      'Content-Type': 'application/json', 
 },});
 export const updateRoom=(id,room)=> axiosInstance.put(`/admin/rooms/${id}`, room, {
    headers: {
      'Content-Type': 'application/json', 
 },});
export const deleteRoomById=(id)=> axiosInstance.delete(`/admin/rooms/${id}`)