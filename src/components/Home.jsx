import React,{useContext,useState} from 'react'
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom" 
import { AuthContext } from './contexts/AuthContext';

export default function Home({location,setLocation}) {

      const {user,connected,socket,agentInfo} = useContext(AuthContext); 
      const [clients,setclients] = useState(0);

    return (
         <div className="flex flex-row w-full h-full">


            <div className="m-auto w-10/12 h-5/6 flex flex-col gap-20">


            <div className="w-full flex flex-row justify-between ">

                  <div className="flex flex-row flex-1 gap-5 items-center">
                        <div className="relative h-20 w-20">
                              <div className="bg-blue-500 w-6 h-6 rounded-full absolute border-3  border-white -right-0 bottom-0 p-1">
                                                                              <svg xmlns="http://www.w3.org/2000/svg" className=" text-white " viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                              </div>
                                                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-full stroke-current text-gray-inactive group-hover:text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                                                </svg>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                              <p className="text-2xl font-bold text-black-nav">Good day, {user.username}</p>
                              <p className="text-gray-inactive font-medium">Check your stats and suggestions for using Sparky!</p>
                        </div>
                  </div>
                              

                              <div>
                  <p className="px-4 py-2 border rounded-md font-bold border-gray-border text-black-nav cursor-pointer hover:bg-gray-100">Explore Sparky</p>
                              </div>
            
            </div>



            <div className="w-full flex flex-col">

            <p  className=" font-bold text-black-nav mb-5">Real time overview</p>
            <div className="w-full  flex flex-col border border-gray-border rounded-md divide-y divide-gray-border">
                  <div className="flex flex-row ">
                  <NavLink to="/chats" className="flex flex-1 flex-col bg-white  hover:bg-gray-100 p-8"  onClick={()=>{
            setLocation('/chats')
            }}>
                  <p className="font-bold text-black-nav">Customers online</p>
                  <p className="font-bold text-black-nav text-4xl">{agentInfo && agentInfo.browsingCustomers.length}</p>
                  </NavLink>
                  <NavLink to="/chats" className="flex flex-1 flex-col bg-white hover:bg-gray-100  p-8"  onClick={()=>{
            setLocation('/chats')
            }}>

                  <p className="font-bold text-black-nav">Ongoing chats</p>
                  <p className="font-bold text-black-nav text-4xl">0</p>
                  </NavLink>
                  <NavLink to="/agents" className="flex flex-1 flex-col bg-white  hover:bg-gray-100  p-8"  onClick={()=>{
            setLocation('/agents')
            }}>
                  <p className="font-bold text-black-nav">Logged in agents</p>
                  <p className="font-bold text-black-nav text-4xl">{agentInfo && agentInfo.onlineAgents.length}</p>
                  </NavLink>
                  </div>
                  <p className="p-4"><span className="font-medium">Tip:</span> Forward your email to Sparknspur so you can manage all your conversations in one place.</p>
                  
            </div>

      </div>




            </div>

        
        </div>
    )
}
