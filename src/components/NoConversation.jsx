import React from 'react'

export default function NoConversation() {
    return (
        <div className="border-r border-gray-300 h-full flex-1 flex flex-col justify-center items-center gap-10">
        <p className="text-4xl font-medium text-gray-400 ">You have no conversation yet!</p>
        <button className="bg-yellow-500 rounded-2xl px-4 p-2 justify-center items-center flex flex-row text-white">Explore Traffic</button>
    </div>
    )
}
