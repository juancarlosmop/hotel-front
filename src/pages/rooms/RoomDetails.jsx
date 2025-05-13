import { useState, useEffect } from "react";
import { useLocation,useParams,useNavigate  } from 'react-router-dom';
import { getRoomById } from '../../services/roomService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {useAuth } from "../../hooks/useAuth";
import { createReservation } from '../../services/reservationService'
import standarImg1 from '../../assets/img/rooms/standar/standar-main.jpg';
import standarImg2 from '../../assets/img/rooms/standar/standar-2.jpg';
import standarImg3 from '../../assets/img/rooms/standar/standar-3.jpg';
import standarImg4 from '../../assets/img/rooms/standar/standar-4.jpg';
import prmiumImg1 from '../../assets/img/rooms/premium/premium-main.jpg';
import prmiumImg2 from '../../assets/img/rooms/premium/premium-2.jpg';
import prmiumImg3 from '../../assets/img/rooms/premium/premium-3.jpg';
import prmiumImg4 from '../../assets/img/rooms/premium/premium-4.jpg';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import 'swiper/css';
import 'swiper/css/navigation';

export const RoomDetails = () => {
    const { id } = useParams();
    const { user } =useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [capacity, setCapacity] = useState(1);
    const[images,setImages]=useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const getRoom = async () => {
        const data = await getRoomById(id);
        setRoom(data);
    };
    const getImagesByType=()=>{
        if(room.type==='STANDAR'){
            setImages([
                standarImg1,
                standarImg2,
                standarImg3,
                standarImg4
            ]);
        }else{
            setImages([
                prmiumImg1,
                prmiumImg2,
                prmiumImg3,
                prmiumImg4
            ]);

        }
    }
    useEffect(() => {
        getRoom();
    }, [id]);

    useEffect(() => {
        if (room) {
          getImagesByType();
        }
      }, [room]);

    const onSubmit = (data) => {
        if(!user){
            Swal.fire({
                icon: 'success',
                title: 'Redirected',
                text: 'You must log in, you will be redirected.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                }
            });
            setTimeout(() => {
                navigate("/login");
            }, 15000);   
        }else{ 
            let checkInDate = data.checkInDate;
            let checkOutDate = data.checkOutDate;
            let total=calculateDays(checkInDate,checkOutDate)*room.pricePerNight;
            let capacity = data.capacity;
            let obj={};
            obj.idUser=user.id;
            obj.idRoom=id;
            obj.checkInDate=checkInDate;
            obj.checkOutDate=checkOutDate;
            obj.total=total;
            try{
                createReservation(obj);
                navigate("/reservation-success",{
                    state:{
                        checkInDate,
                        checkOutDate,
                        capacity,
                        room
                    }
                });
            }catch(e){
                console.log(e);
            }
        }
    };
    const calculateDays = (checkInDate, checkOutDate) => {
        if (!checkInDate || !checkOutDate) return;
        
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
    
        const diffTime = checkOut - checkIn;
        const diffDays = diffTime / (1000 * 3600 * 24); 
    
        return diffDays; 
      };

    return (
        room && (
            <div className="max-w-2xl mx-auto px-4  bg-white rounded-2xl shadow-lg overflow-hidden">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={10}
                    slidesPerView={1}
                    className="relative"
                    >
                    {images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt={`Room ${index}`} className="w-full h-60 object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Room</h3>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="text-gray-700 mb-2">{room.type}</p>
                    <p className="text-gray-600 mb-2">{room.description}</p>
                    <p className="text-blue-700 text-lg font-semibold mb-4">${room.pricePerNight} / nigth</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-in:</label>
                            <input
                                type="date"
                                {...register("checkInDate", {
                                  required: "The check-in is required",
                                  validate: (value) => {
                                    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                                    return value  >= today || "The check-in should be required";
                                  }
                                })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"

                            />
                            {errors.checkInDate && <p className="text-red-500 text-sm ">{errors.checkInDate.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Check-out:</label>
                            <input
                                type="date"
                                {...register("checkOutDate", {
                                  required: "The check-out is required",
                                  validate: (value) => {
                                    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                                    return value >= today || "The check-out should be required";
                                  }
                                })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                             {errors.checkOutDate && <p className="text-red-500 text-sm ">{errors.checkOutDate.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">People:</label>
                            <input
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                {...register('capacity',{required:'The number of persons is required',
                                    valueAsNumber: true,
                                    validate: (value) =>
                                        !isNaN(value) || "You shoul put a number value",
                                    min: {
                                        value: 1,
                                        message: "The number should be one at least"
                                      },
                                      max: {
                                        value: 4,
                                        message: "The maximu should be fourth"
                                      }
                                })}
                            />
                            {errors.capacity && <p className="text-red-500 text-sm ">{errors.capacity.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
                        >
                            Book
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};


