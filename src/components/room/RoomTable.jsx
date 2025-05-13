export const RoomTable=({rooms,onEdit,onDelete})=>{
    return(
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map(room => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{room.number}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{room.pricePerNight}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => onEdit(room)}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(room)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

};