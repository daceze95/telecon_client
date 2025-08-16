import { io } from "socket.io-client";
import { SERVER_BASEURL } from "../config/config";

export const socket = io(SERVER_BASEURL);

// socket.on("connect", () => {
//     console.log("socket connected")
// })

socket.on("welcome",(data) => console.log(data))