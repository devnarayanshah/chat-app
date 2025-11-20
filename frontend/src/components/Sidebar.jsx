import React from "react";
import { IoSearch } from "react-icons/io5";
import OtherUser from "./OtherUser";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import {
  setAuthUser,
  setOtherUSers,
  setSelectedUSer,
} from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setOtherUSers(null));
      dispatch(setSelectedUSer(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      
      <div className="divider px-3"></div>
      <OtherUser />
      <div className="mt-1">
        <button className="btn btn-sm" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
