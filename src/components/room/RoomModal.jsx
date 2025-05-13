import { useForm } from "react-hook-form";
export const RoomModal=({room,onCloseModal,formData,mode,onSaveEdit})=>{
    console.log(mode)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData
      });

    const onsubmit=(data)=>{
        onSaveEdit(data);
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4"> {mode === 'edit' ? 'Edict Room' : 'Add Room'}</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mb-4">
                <label className="block text-sm">Room number:</label>
                <input
                     {...register('number', { required: 'The number is required' })}
                     className={`w-full border px-3 py-2 rounded ${errors.number ? 'border-red-500' : ''}`}
                     disabled={mode === 'edit'}
                />
                 {errors.number && <p className="text-red-500 text-xs">{errors.number.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm">Type of Room:</label>
                <select
                    {...register('type', { required: 'The rol is required' })}
                    className={`w-full border px-3 py-2 rounded ${errors.type ? 'border-red-500' : ''}`}
                    >
                    <option value="">Select a Room</option>
                    <option value="STANDARD">Standar</option>
                    <option value="PREMIUM">Premium</option>
                </select>
            {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm">Description</label>
                <textarea
                    {...register('description', { required: 'The description is required' })}
                    className={`w-full border px-3 py-2 rounded ${errors.description ? 'border-red-500' : ''}`}
                />
                 {errors.description && <p className="text-red-500 text-sm ">{errors.description.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm">Price per Night</label>
                <input
                    {...register('pricePerNight', { required: 'The price per night is required' })}
                    className={`w-full border px-3 py-2 rounded ${errors.pricePerNight ? 'border-red-500' : ''}`}
                />
                 {errors.pricePerNight && <p className="text-red-500 text-sm ">{errors.pricePerNight.message}</p>}
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={onCloseModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Close
              </button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            </div>
            </form>
          </div>
        </div>
    );

}
