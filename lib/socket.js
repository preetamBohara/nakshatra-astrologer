"use client"
import { connect, io } from 'socket.io-client';

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
// for production build
export const socket = connect(socketUrl);



// console.log("socket", socket)