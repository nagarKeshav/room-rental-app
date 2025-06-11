import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase/Firebase';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function Allpost() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ lowercase
  const authStatus = useSelector((state) => state.auth.status);

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  const fetchMyRooms = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const q = query(collection(db, 'rooms'), where('ownerId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const userRooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(userRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus) {
      fetchMyRooms();
    }
  }, [authStatus]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {rooms.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        rooms.map((room) => <RoomCard key={room.id} room={room} />)
      )}
    </div>
  );
}

export default Allpost;
