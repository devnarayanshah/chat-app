import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocket, io } from "../socket/socket.js";

// ==================== Send Message ====================
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;            // from isAuthenticated middleware
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create new conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        message: [],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      sendId: senderId,
      receiverId,
      message,
    });

    // Add message to conversation
    conversation.message.push(newMessage._id);
    await conversation.save();

    // Emit message to receiver if online
    const receiverSocket = getReceiverSocket(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("message", newMessage);
    }

    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("SendMessage error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== Get Messages ====================
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("message");

    return res.status(200).json({
      success: true,
      messages: conversation?.message || [],
    });
  } catch (error) {
    console.error("GetMessage error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
