import React from 'react'
import { useHistory } from "react-router-dom"; 

export default function NoConversation() {
    const history = useHistory()
 const handleclick = (e)=>{
         history.push('/traffic')
 }
    return (
        <div className="border-r border-gray-300 h-full flex-1 flex flex-col justify-center items-center gap-10">
        <p className="text-4xl font-medium text-gray-400 ">You have no conversations yet!</p>
        <button onClick={handleclick} className="bg-yellow-500 rounded-2xl px-4 p-2 justify-center items-center flex flex-row text-white">Explore Traffic</button>
    </div>
    )
}
