import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../Firebase/Firebase';
import { doc, deleteDoc } from "firebase/firestore";

const RoomCard = ({ room }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUserId = useSelector((state) => state.auth.userData?.uid);
  const isOwner = currentUserId && room.ownerId === currentUserId;

  // console.log('Current User ID:', currentUserId);
  // console.log('Room Owner ID:', room.ownerId);
  


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const roomRef = doc(db, 'rooms', room.id);
      await deleteDoc(roomRef);
      console.log('Room deleted from Firestore:', room.id);
      alert('Room deleted successfully!');
      setShowDeleteConfirm(false);
      // Call the optional parent delete handler to update the UI
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
      alert('Failed to delete room. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };


  const handleEdit = () => {
   
    console.log('Edit room:', room);
    alert(`Edit functionality for "${room.title}" - This would open an edit form`);
    
  };

  if (!room) {
    return <div className="text-center text-gray-500">No room data available</div>;
  }
  // console.log(room);
  

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 py-4 px-2 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100 group">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={room.imageUrl}
              alt={room.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/api/placeholder/400/256';
              }}
            />
            {
              isOwner && (
             <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {/* Edit and Delete Buttons */}
              {/* <button onClick={handleEdit} className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110" title="Edit Room">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button> */}
              <button onClick={handleDelete} className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110" title="Delete Room">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
              )
            }
            <div className="absolute bottom-4 left-4">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                ₹{room.price}
              </div>
            </div>
          
          </div>

          {/* Text Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{room.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{room.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500 font-bold">{room.location}</div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Facilities:</h4>
              <div className="flex flex-wrap gap-2">
                {room.facilities?.map((facility, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {
              isOwner && (
                <div className="flex space-x-3 pt-4 border-t border-gray-100">
              {/* <button onClick={handleEdit} className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 hover:shadow-md">
                <span>Edit</span>
              </button> */}
              <button onClick={handleDelete} className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 hover:shadow-md">
                <span>Delete</span>
              </button>
            </div>
              )
            }
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Room</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Are you sure you want to delete "<strong>{room.title}</strong>"? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50">
                    Cancel
                  </button>
                  <button onClick={handleDelete} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50">
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
