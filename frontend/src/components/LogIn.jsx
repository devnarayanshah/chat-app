import axios from 'axios'
import React, { useState} from 'react'
import {Link, useNavigate} from  'react-router-dom'
import toast from "react-hot-toast"

import {useDispatch} from'react-redux'
import { setAuthUser } from '../redux/userSlice'

const LogIn = () => {
  const [user,setUser]=useState({
    username:"",
    password:""
  })
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const onsubmit= async(e)=>{
    e.preventDefault();
try {
  const res=  await axios.post('http://localhost:8080/api/v1/user/login',user,{
  headers:{
    "Content-Type":"application/json",
  },withCredentials:true
  })
  if(res.data.success){
    toast.success("you are  successfully login")
    dispatch(setAuthUser(res.data))
    navigate("/")

  }
} catch (error) {
  console.log(error)
}
    

  }
  return (
    <div className='min-w-96 mx-auto  '>
      <div className=' h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'> 
      <form action="" onSubmit={onsubmit}>
      <div>
            <label className="label p-2" >
              <span className="text-base " >User Name</span>
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e)=>{setUser({...user,username:e.target.value});}}
              className="w-full h-10 input input-bordered"
              placeholder="User Name"
            />
          </div>
          <div>
          <label className="label p-2">
              <span className="text-base ">Password</span>
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e)=>{setUser({...user,password:e.target.value});}}
              className="w-full h-10 input input-bordered"
              placeholder="User Name"
            />
          </div>
          <p className="flex justify-center">
            please signup?{" "}
            <Link to="/register" className="text-blue-400">
              Login
            </Link>
          </p>
          <button className='btn btn-block flex items-center' type='submit'>submit</button>
      </form>
      </div>
    </div>
  )
}

export default LogIn