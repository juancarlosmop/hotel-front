import { useState, useEffect } from "react";
import { getAllRooms } from "../services/roomService";

export const useRoom =()=>{
    const[rooms,setRooms]=useState([]);
    const[error,setError]=useState();
    const getRooms =async()=>{
        try{
            const data = await getAllRooms();
             setRooms(data)   
        }catch(e){
            setError(e.message);  
        }
    }
    useEffect(()=>{
        getRooms();
    },[]);

    return{ rooms,error,getRooms};
};