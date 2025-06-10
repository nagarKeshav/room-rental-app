import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import RoomCard from '../RoomCard';

const Home = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRooms();
  }, []);

  console.log(allRooms);
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {allRooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        allRooms.map(room => (
         <RoomCard key={room.id} room={room} />
        ))
      )}
    </div>
  );
};

export default Home;
