import React,{useContext, useState} from 'react'
import { AuthContext } from './contexts/AuthContext'
import { useHistory } from 'react-router'
import Queued from './Queued'

export default function Traffic() {
    const {user,connected,socket,agentInfo} = useContext(AuthContext)
    const [location, setLocation] = useState("/traffic") 
    return (
       
        <div className="w-full flex flex-col h-full">
            {/* topbar */}
            <div className="w-full border-gray-300 border flex flex-row">
                    
                    <div className="bg-white overflow-x-auto flex flex-row relative overflow-y-hidden justify-center items-center h-14 no-scrollbar px-2">
                            
                            <div  className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/traffic" ? "text-yellow-500":"text-black"}`}>All Customers <span className="text-black">{`(${agentInfo.browsingCustomers.length})`}</span></p>
                               {location === "/" && <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>

                            <div  className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/chatting")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/chatting" ? "text-yellow-500":"text-black"}`}>Chatting <span className="text-black">{`(0)`}</span></p>
                               {location === "/chatting" && <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div >
                            <div to ="/supervised" className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/supervised")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/supervised" ? "text-yellow-500":"text-black"}`}>Supervised <span className="text-black">{`(0)`}</span></p>
                               {location === "/supervised" &&  <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>
                            <div className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/queued")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/queued" ? "text-yellow-500":"text-black"}`}>Queued <span className="text-black">{`(${agentInfo.QueuedCustomers.length})`}</span></p>
                               {location === "/queued" &&  <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>

                            <div to ="/waitingForReply"  className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/waitingForReply")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/waitingForReply" ? "text-yellow-500":"text-black"}`}>Waiting for reply <span className="texblack">{`(0)`}</span></p>
                               {location === "/waitingForReply" &&  <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>

                            <div to ="/invited" className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/invited")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/invited" ? "text-yellow-500":"text-black"}`}>Invited<span className="text-black">{`(0)`}</span></p>
                               {location === "/invited" &&  <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>
                            <div to ="/browsing" className="flex flex-col justify-center relative hover:bg-gray-200 h-full px-4 group" onClick={()=>{
                                setLocation("/browsing")
                            }}>
                                <p className={`text-sm group-hover:text-yellow-500 font-bold ${location === "/browsing" ? "text-yellow-500":"text-black"}`}>Browsing <span className="text-black">{`(${agentInfo.browsingCustomers.length})`}</span></p>
                               {location === "/browsing" && <div className="w-full h-1 bg-yellow-500 absolute bottom-0 right-0 left-0 rounded-full"></div>}
                            </div>
                    </div>
                    <div className="bg-white  flex  flex-row justify-center items-center absolute right-0  top-0 border-t border-l border-r border-gray-300 h-14 w-10">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </div>
            </div>

            {/* topbar */}
            <div className="h-14 w-full">
                {location === '/queued' && <Queued/>}
           </div>
           </div>
    )
}
