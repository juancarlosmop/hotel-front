import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAllReservationsByIdUser } from "../../services/reservationService";
import standardImg from '../../assets/img/rooms/standar/standar-main.jpg';
import premiumImg from '../../assets/img/rooms/premium/premium-main.jpg';

export const UserReservations=()=>{
    const[reservation,setReservation]=useState([]);
    const{ user } = useAuth();
    const getReservation= async()=>{
        let list= await getAllReservationsByIdUser(user.id);
        setReservation(list)
    }
    useEffect(()=>{
        
        getReservation();
    },[]);
    return(
        <>
        <div className="max-w-7x1 mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservation.map((item)=>(
                <div key={item.number} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img
                            src={item.type === 'STANDARD' ? standardImg : premiumImg}
                            alt={`Habitación ${item.type}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Number:{item.number}</h3>
                            <p className="text-gray-600">Type:{item.type}</p>
                            <p className="text-gray-600">Check-In:{item.checkInDate}- Check-out:{item.checkOutDate}</p>
                            <p className="text-gray-600">Total:${item.total}</p>
                        </div>    
                </div>
             ))} 
        </div>
        </>
    );

};