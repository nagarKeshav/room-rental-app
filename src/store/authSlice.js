import {createSlice} from '@reduxjs/toolkit';
import { LogIn } from 'lucide-react';

const initialState = {
    status: false,
    userData: null

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Login: (state,action) => {
           state.status =  true
           state.userData = action.payload.userData

        },
        logout: (state) => {
           state.status = false
        }
    }
})


export const {Login,logout} = authSlice.actions
export default authSlice.reducer