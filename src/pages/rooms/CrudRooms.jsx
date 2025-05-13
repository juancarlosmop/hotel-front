import { useState } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { deleteRoomById } from '../../api/reservationApi';
import {RoomTable} from '../../components/room/RoomTable';
import {RoomModal} from '../../components/room/RoomModal';
import { createRoom,updateRoom } from '../../services/roomService';
import Swal from 'sweetalert2';
export const CrudRooms =()=> {
  const [room, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {rooms, getRooms} = useRoom(); 
  const[formData,setFormData] = useState(null);
  const[mode,setMode]=useState('');
  const[error,setError]=useState('');
  const handleEdit = (room) => {
    setMode('edit');
    setFormData({
      number:room.number,
      type:room.type,
      description:room.description,
      pricePerNight:room.pricePerNight
    });
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSave=()=>{
    setMode('register');
    setFormData(null);
    setIsModalOpen(true);

  }

  const handleDelete = (room) => {
  Swal.fire({
  title: '¿Are you sure?',
  text: 'This action cannot be undone.',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sí, eliminar',
  cancelButtonText: 'Cancelar',
  buttonsStyling: false, 
  customClass: {
    confirmButton: 'bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700',
    cancelButton: 'bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700'
  }
}).then(async (result) => {
  if (result.isConfirmed) {
    try {
      await deleteRoomById(room.id); 
      getRooms(); 
      await Swal.fire({
        icon: 'success',
        title: '¡Deleted!',
        text: 'The record was deleted..',
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

  };
  

  const handleSaveEdit=async(data)=>{
    if(mode==='edit'){
      data.available=true;
      await updateRoom(room.id,data);
      await Swal.fire({
        icon: 'success',
        title: '¡Updated!',
        text: 'The record was updated',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        }
      });
    }
    if(mode==='register'){
      await createRoom(data);
      await Swal.fire({
        icon: 'success',
        title: '¡Created!',
        text: 'The record was created',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        }
      });
    }
    setIsModalOpen(false);
    getRooms();
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setFormData(null);
    setMode('');
  };

  return (
    <div className="p-4">
      <div className="p-4 flex flex-row-reverse">
      <button onClick={handleSave} className="text-white px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
                Add Room
      </button>
      </div>
      <RoomTable
      rooms={rooms}
      onEdit={handleEdit}
      onDelete={handleDelete}
      >
      </RoomTable>
      {/* Modal */}
      {isModalOpen && (
        <RoomModal room={room} formData={formData} mode={mode} onCloseModal={closeModal} onSaveEdit={handleSaveEdit} />
      )}
    </div>
  );
};