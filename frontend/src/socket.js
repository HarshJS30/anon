import { io } from 'socket.io-client';
const SOCKET_URL = 'https://anon-1rcv.onrender.com'
export const socket = io(SOCKET_URL)
