import io from "socket.io-client";
const SOCKET_URL = 'ws://localhost:5000';
const SOCKET_URL1 = 'wss://www.getsparky.io/';

export const socket = io(SOCKET_URL1);
