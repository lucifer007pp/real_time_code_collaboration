// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const roomUsers = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);

        if (!roomUsers[roomId]) {
            roomUsers[roomId] = [];
        }

        if (!roomUsers[roomId].includes(username)) {
            roomUsers[roomId].push(username);
        }

        io.to(roomId).emit('user-list', roomUsers[roomId]);
        console.log(`${username} joined room ${roomId}`);
    });

    socket.on('code-change', ({ roomId, code }) => {
        socket.to(roomId).emit('code-change', code);
    });

    socket.on('language-change', ({ roomId, language }) => {
        socket.to(roomId).emit('language-change', language);
    });

    socket.on('leave-room', ({ roomId, username }) => {
        if (roomUsers[roomId]) {
            roomUsers[roomId] = roomUsers[roomId].filter(user => user !== username);
            io.to(roomId).emit('user-list', roomUsers[roomId]);
        }
        socket.leave(roomId);
        console.log(`${username} left room ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});