
import standardImg from '../../assets/img/rooms/standar/standar-main.jpg';
import premiumImg from '../../assets/img/rooms/premium/premium-main.jpg';

export const Room = ({item,onNavigate})=>{
    const onDetail=(id)=>{
        onNavigate(id);
    }
    return(
        <>
        <div  className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
            src={item.type === 'STANDARD' ? standardImg : premiumImg}
            alt={`Habitación ${item.type}`}
            className="w-full h-48 object-cover"
        />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">Room number {item.number}</h3>
                    <p className="text-gray-600 font-bold">Type:{item.type}</p>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-blue-700 font-bold mt-2">${item.pricePerNight} / nigth</p>
                </div>
            <button onClick={()=>onDetail(item.id)}className="w-full bg-blue-600 text-white py-2 rounded-lg">details</button>   
        </div>
        </>
    )

};