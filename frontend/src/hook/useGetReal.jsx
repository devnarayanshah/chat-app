import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

 const useGetReal = () => {
  
    const {Socket}= useSelector(store=>store.socket)
   const {messages}= useSelector(store=>store.messageList);
    const dispatch = useDispatch();
    useEffect(()=>{

if(!Socket) return;
const handleNewMessage= (newMessage)=>{
    dispatch(setMessages([...messages,newMessage]))
}

Socket.on("message",handleNewMessage)
return ()=>{
    Socket.off("message",handleNewMessage)
}



        // Socket?.on("message",(newMessage)=>{
        //     dispatch(setMessages([...messages,newMessage]));
        // })
        // return ()=> Socket.off("message",(newMessage))
    },[Socket,messages,dispatch]);
}
export default useGetReal;