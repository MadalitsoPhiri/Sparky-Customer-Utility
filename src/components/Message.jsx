import React,{useContext} from 'react'
import { AuthContext } from './contexts/AuthContext'
import { format } from 'timeago.js';


export default function Message({msg}) {
   
    const {user} = useContext(AuthContext) 
    // console.log(msg.senderId)
    return (
        <div className={`${msg.senderId != user.agentId ?"bg-gray-200 self-start" :"bg-yellow-500 self-end"} max-w-xs rounded-xl flex flex-col`}>
        <p className={`p-4   break-words ${msg.senderId != user.agentId?"text-black":"text-white"}  font-medium text-sm`}>{msg.text}</p>  
        <p className={`self-end ${msg.senderId != user.agentId?"text-black":"text-white"} font-medium text-xs px-4 py-2`}>{format(msg.createdAt)}</p>
        </div> 
    )
}
