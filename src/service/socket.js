import io from "socket.io-client";
import { BASE_URL } from "../Constants";
const DEV = 'ws://localhost:5000';
const PROD = 'wss://www.getsparky.io/';

export const socket = io(DEV);
