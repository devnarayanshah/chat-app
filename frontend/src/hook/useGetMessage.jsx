import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessage = () => {
  const apiurl = import.meta.env.VITE_API_URL;

  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`${apiurl}apiUrl/api/v1/user/`, {
          withCredentials: true,
        });

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [selectedUser, dispatch,apiurl]);
};

export default useGetMessage;
