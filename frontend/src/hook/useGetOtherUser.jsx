import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUSers } from "../redux/userSlice";

const useGetOtherUser = () => {
  const dispatch = useDispatch();
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/v1/user/`, {
          withCredentials: true,
        });

        dispatch(setOtherUSers(res.data));
        console.log(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUser();
  }, [dispatch,apiurl]);
};

export default useGetOtherUser;
