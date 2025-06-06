import React from 'react'
import authService from '../../FirebaseService/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

function Logout() {
  const dispatch = useDispatch()

 
const logoutHandler = () => {
  authService.logoutAccount()
    .then(() => {
      dispatch(logout()); // ✅ This should clear user from Redux store
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};


  return (
    <div>
      <button
       className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 mr-1 sm:mr-2 focus:outline-none transition-colors duration-200"
       onClick={logoutHandler}
        >Logout</button>
    </div>
  )
}

export default Logout
