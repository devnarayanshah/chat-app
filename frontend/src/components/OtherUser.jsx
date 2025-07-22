import React from "react";
import Other from "./Other";
import useGetOtherUser from "../hook/useGetOtherUser";
import { useSelector } from "react-redux";

const OtherUser = () => {
  useGetOtherUser();
  const {otherUsers}=useSelector(store=>store.user);
  if(!otherUsers){
    return;
  }
  return (
    <div className="overflow-auto">
      {
        otherUsers?.message?.map((user)=>{
          return(
            <Other key={user._id} user={user}/>
          )
        })
      }
       
        
    </div>
  );
};

export default OtherUser;
