import React from "react";
import Message from "./Message";
import useGetMessage from "../hook/useGetMessage";
import { useSelector } from "react-redux";
import useGetReal from "../hook/useGetReal";

const Messages = () => {
  useGetReal();
  useGetMessage();
  const { messages } = useSelector((store) => store.messageList);
  if (!messages) return;

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages &&
        messages?.map((message) => {
          
          return(
          <Message key={message._id} message={message} />)
        })}
    </div>
  )
};
 
export default Messages;
