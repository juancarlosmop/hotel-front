import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Reservations } from '../pages/reservations/Reservations';
import { CrudRooms } from '../pages/rooms/CrudRooms';
export const AdminRoutes=()=>{
    return(
        <>   
            <Route path="/scheduled-reservations" element={<Reservations/>}/>
            <Route path="/admin-rooms" element={<CrudRooms/>}/>
        </>
    );

}