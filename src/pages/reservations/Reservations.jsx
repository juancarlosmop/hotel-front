import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAllReservations,cancelReservation } from "../../services/reservationService";
import Swal from 'sweetalert2';
import standardImg from '../../assets/img/rooms/standar/standar-main.jpg';
import premiumImg from '../../assets/img/rooms/premium/premium-main.jpg';
export const Reservations=()=>{
    const[reservation,setReservation]=useState([]);
    const{ user } = useAuth();
    
    const getReservation= async()=>{
        let list= await getAllReservations();
        setReservation(list);
    };
    useEffect(()=>{
        getReservation();
    },[]);
    const handleCancel=async(id)=>{
            Swal.fire({
            title: '¿Are you sure to cancel the schedule room?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel',
            cancelButtonText: 'Cancel',
            buttonsStyling: false, 
            customClass: {
              confirmButton: 'bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700',
              cancelButton: 'bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700'
            }
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await cancelReservation(id);
                await getReservation();
                await Swal.fire({
                  icon: 'success',
                  title: '!Canceled!',
                  text: 'The reservations was cancelled',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                  }
                });
              } catch (error) {
                console.error(error);
                await Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'The record could not be deleted.',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
                  }
                });
              }
            }
            });

        
    }
    return(
        <>
        <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservation.map((item)=>(
                <div  className="bg-white rounded-xl shadow-md overflow-hidden">
                        <img
                            src={item.type === 'STANDARD' ? standardImg : premiumImg}
                            alt={`Habitación ${item.type}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Name :{item.nameUser}</h3>
                            <p className="text-gray-600">Number:{item.number} </p>
                            <p className="text-gray-600">Type:{item.type}</p>
                            <p className="text-gray-600">Check-In:{item.checkInDate}- Check-out:{item.checkOutDate}</p>
                            <p className="text-gray-600">Price per Nigth${item.pricePerNight}</p>
                            <p class="text-gray-600">Total:${item.total}</p>
                        </div>
                        <button onClick={()=>handleCancel(item.id)}className="w-full bg-blue-600 text-white py-2 rounded-lg">cancel</button>                         
                </div>
             ))} 
        </div>
        </>
    );

};