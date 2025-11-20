import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice'


const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser}=useSelector(store=>store.user)
  const {messages}= useSelector(store=>store.messageList)
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
   try {
     const res = await axios.post(`https://chat-app-3eav.onrender.com/api/v1/message/send/${selectedUser?._id}`,{message},{
      headers: { 'Content-Type': 'application/json'
     },
    withCredentials:true})
    
     dispatch(setMessages([...messages,res?.data]))
   } catch (error) {
    console.log(error)
    
   }
   setMessage("")
  }
  return (
    <form  onSubmit={onSubmitHandler}className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="send a message "
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />
        <button type="submit" className="absolute flex items-center inset-y-0 end-2">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
