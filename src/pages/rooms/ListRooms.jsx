import {useRoom} from "../../hooks/useRoom";
import {useAuth} from "../../hooks/useAuth"
import {Room} from "../../components/room/Room";
import { useNavigate } from "react-router-dom";
export const ListRooms =()=>{
    const{user}=useAuth();
    const{rooms,error}= useRoom();
    const navigate = useNavigate();
    const handleNavegationDetail=(id)=>{
        navigate(`/room-detail/${id}`);  
        
    }
    return(
        <>
           <div className="max-w-7x1 mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap6">
            {rooms.map((item)=>(
                <Room key={item.id} item={item} onNavigate={handleNavegationDetail}></Room>
             ))} 
           </div>
        </>
    );

};