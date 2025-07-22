import React from 'react'
import { IoSearch } from "react-icons/io5";
import OtherUser from './OtherUser';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import axios from 'axios';
import toast from 'react-hot-toast'
import { setAuthUser,setOtherUSers,setSelectedUSer } from '../redux/userSlice';


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async ()=>{
    try {
      
      const res= await axios.get(`http://localhost:8080/api/v1/user/logout`)
      navigate("/login")
    toast.success(res.data.message)
    dispatch(setAuthUser(null));
    dispatch(setOtherUSers(null));
    dispatch(setSelectedUSer(null));
    
    

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form action="" className='flex items-center gap-1'>
        <input type="text" className='input  rounded-sm' placeholder='search....' />
        <button type='submit' className='btn  bg-zinc-400'>
        <IoSearch  className='w-5 h-5 outline-none '/>
        </button>
      </form>
      <div className='divider px-3'></div>
      <OtherUser/>
      <div className='mt-1'>
        <button className='btn btn-sm' onClick={logoutHandler}>Logout</button>
      </div>
    
    </div>
  )
}

export default Sidebar