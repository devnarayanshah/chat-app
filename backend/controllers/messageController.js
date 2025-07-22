import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocket, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try {
        
        const senderId= req.id;
        const receiverId= req.params.id
        const {message}= req.body;
        let gotConversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
       
        
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })

        }
        const newMessage = await Message.create({
            sendId: senderId,
            receiverId,
            message
        });
        
        if(newMessage){

            gotConversation.message.push(newMessage._id);
        }
        await Promise.all([gotConversation.save(), newMessage.save()]);
        
         const receiverIdSocket= getReceiverSocket(receiverId)
         if(receiverIdSocket){
 io.to(receiverIdSocket).emit("message",newMessage);
         }
       
        
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("error",error);
    }
}
export const getMessage = async (req, res) => {
    try {
        
        const receiverId =req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}}).populate("message")
return res.status(200).json(conversation?.message);
    } catch (error) {
        console.log(error)
        
    }
}