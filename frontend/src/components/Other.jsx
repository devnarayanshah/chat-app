import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUSer } from "../redux/userSlice";

const Other = (props) => {
  const user = props.user;
  const dispatch = useDispatch();
  const { selectedUser, onlineUSer } = useSelector((store) => store.user);

  const selectedUSerr = (user) => {
    dispatch(setSelectedUSer(user));
  };
  
    const isOnline = onlineUSer?.includes(user._id);
  

  return (
    <>
      <div
        onClick={() => selectedUSerr(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-700" : ""
        } rounded-sm flex items-center hover:bg-zinc-700  p-2 cursor-pointer gap-3`}
      >
        <div className={`avatar ${isOnline ?"avatar-online":""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user profile" />
          </div>
        </div>

        <div className="">
          <p>{user?.fullName}</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Other;
