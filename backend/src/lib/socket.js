import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    origin: 'https://symmetrical-tribble-q7v54qqrw7pfxvvp-5173.app.github.dev/',
    methods: ['GET', 'POST'],
    credentials: true
})

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

//Used to store online users
const userSocketMap = { //{userID: socketID}

}
io.on("connection", (socket) => { //Socket here refers to the user that has connected
    console.log(`User ${socket.id} connected`);

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} connected`);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server }