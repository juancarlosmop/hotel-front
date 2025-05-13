import axios from "axios";
import axiosInstance from "./axiosInstance";

export const saveReservation=(reservation)=> axiosInstance.post('/user/create-reservation', reservation, {
    headers: {
      'Content-Type': 'application/json', 
    },});

export const getReservationByIdUser=(id)=> axiosInstance.get(`/user/reservations/${id}`);

export const getReservationsByuser=(id)=> axiosInstance.get('/admin/reservations');

export const cancelReservation=(id)=> axiosInstance.delete(`/admin/reservations-cancel/${id}`);

export const deleteRoomById=(id)=> axiosInstance.delete(`/admin/rooms/${id}`);


