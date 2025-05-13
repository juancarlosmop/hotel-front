import { useLocation, useNavigate } from 'react-router-dom';

export const ReservationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { checkInDate, checkOutDate, capacity, room } = location.state || {};
    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Reservation confirmed!</h1>
            <p className="text-gray-700 mb-2">You have booked the room:</p>
            <p className="text-lg font-semibold">{room.number || "Habitación"}</p>
            <p className="text-gray-600">From <strong>{checkInDate}</strong> To <strong>{checkOutDate}</strong></p>
            <p className="text-gray-600">For <strong>{capacity}</strong> persona(s)</p>
            <p className="text-blue-700 font-bold mt-2">${room.pricePerNight} / nigth</p>
            <button 
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => navigate('/rooms')}
            >
                Back
            </button>
        </div>
    );
    
};

