import * as roomApi from '../api/roomApi';
import * as ResponseStatus from '../utils/ErrorFormat';
export const getAllRooms= async()=>{
    const response = await roomApi.getRooms()
    return  response.data.data;
}

export const getRoomById= async(id)=>{
    const response= await roomApi.getRoomById(id);
    return response.data.data;
}

export const createRoom=async(room)=>{
    await roomApi.saveRoom(room)
};

export const updateRoom=async(id,room)=>{
    await roomApi.updateRoom(id,room);
};

export const  deleteRoomById= async(id)=>{
     const response= await roomApi.deleteRoomById(id);
}

