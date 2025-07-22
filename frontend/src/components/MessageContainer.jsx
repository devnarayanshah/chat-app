import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const {selectedUser}= useSelector(store=>store.user);
 
  
  return (
    <>
    {
      selectedUser !== null ? ( <div className="md:min-w-[450px] flex flex-col">
        <div className=" rounded-sm flex items-center bg-zinc-800 mb-2 px-4 py-2  cursor-pointer gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={selectedUser?.profilePhoto}
                alt="user profile"
              />
            </div>
          </div>
  
          <div className="">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>) :(
        <div className='md:min-w-[450px] flex flex-col justify-center items-center'>
        
        <h1 className='text-xl  text-white'>Let's start conversation</h1>

    </div>
      )
    }
   
    </>
  );
}

export default MessageContainer;
