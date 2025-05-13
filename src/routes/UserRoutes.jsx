import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListRooms } from '../pages/rooms/ListRooms'
import { RoomDetails } from '../pages/rooms/RoomDetails';
import { ReservationSuccess } from '../pages/reservations/ReservationSuccess';
import { UserReservations } from '../pages/reservations/UserReservations';

export const UserRoutes=()=>{
    return(
        <>   
            <Route path="/rooms" element={<ListRooms />} />
            <Route path="/room-detail/:id" element={<RoomDetails/>}/>
            <Route path="/reservations" element={<UserReservations/>}/>
            <Route path="/reservation-success" element={<ReservationSuccess/>}></Route>
        </>
    );

}