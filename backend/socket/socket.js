import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    },
});
const  userSocket = {};
export const getReceiverSocket = (receiverId)=>{
    return userSocket[receiverId]
}

io.on('connection', (socket) => {
   
    const userId = socket.handshake.query.userId;
    
   
    if (userId !== undefined) {
        userSocket[userId] = socket.id
        
    }
    io.emit('getOnlineUser', Object.keys(userSocket))
    socket.on("disconnect", () => {
       console.log("socket disconnected", socket.id);
        delete userSocket[userId]
        io.emit('getOnlineUser', Object.keys(userSocket))
    })
})
export { app, io, server }