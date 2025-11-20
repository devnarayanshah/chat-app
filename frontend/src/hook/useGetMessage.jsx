import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(state => state.user);
  const apiurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/v1/message/${selectedUser._id}`, {
          withCredentials: true,
        });

        dispatch(setMessages(res.data.messages));
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();
  }, [selectedUser, apiurl, dispatch]);
};

export default useGetMessages;
