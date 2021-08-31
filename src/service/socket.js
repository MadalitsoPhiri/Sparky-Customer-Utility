import io from "socket.io-client";
const SOCKET_URL = 'ws://localhost:5000';

export const socket = io(SOCKET_URL);