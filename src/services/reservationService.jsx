import * as reservationApi from '../api/reservationApi';

export const createReservation=async(reservation)=>{
    await reservationApi.saveReservation(reservation);
};

export const getAllReservationsByIdUser=async(id)=>{
    const list=await reservationApi.getReservationByIdUser(id);
    return list.data.data.map(dataReservations);
 }

 export const getAllReservations=async()=>{
    const list=await reservationApi.getReservationsByuser();
    return list.data.data.map(dataReservationsByUsers);

 }

 export const cancelReservation= async(id)=>{
    await reservationApi.cancelReservation(id);
 }

 function dataReservationsByUsers(item){
    return{
        id:item.id,
        nameUser:item.user.fullName,
        number: item.room.number,
        type: item.room.type,
        pricePerNight:item.room.pricePerNight,
        price:item.room.pricePerNight,
        checkInDate:item.checkInDate,
        checkOutDate:item.checkOutDate,
        total:item.total
    }
 }

 function dataReservations(item){
    return{
        number: item.room.number,
        type: item.room.type,
        price:item.room.pricePerNight,
        checkInDate:item.checkInDate,
        checkOutDate:item.checkOutDate,
        total:item.total
    }


}