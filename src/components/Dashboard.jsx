import React,{useState,useContext,useEffect} from "react";

import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom" 
import {ReactComponent as ReactLogo} from '../assets/under_construction.svg';
import { AuthContext } from "./contexts/AuthContext";
import Chats from "./Chats";
import Home from "./Home";
import Traffic from "./Traffic";




function Dashboard() {


 const {user,connected,socket,agentInfo} = useContext(AuthContext) 

 const [location,setLocation] = useState('/')
 const [agents,setagents] = useState(0)
 


 useEffect(()=>{

 
  socket.emit('agentLoggedIn',user)
 
 
   


 console.log(user)
  
 },[])



  return (
    <Router>
    <div className="flex flex-row w-screen h-screen overflow-x-auto">
      {/* navbar */}
     <div className="flex flex-col h-full py-2 bg-black-nav justify-between">
      
       <div className="flex flex-col  items-center max-w-full">
       <div className="flex flex-col  items-center max-w-full my-2">
        
         <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
       </div>

       <NavLink  to="/" className="group flex flex-col hover:bg-gray-active p-4 items-center w-full relative" onClick={()=>{
         setLocation('/')
       }}>
     <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
                        <p className={`text-xs ${location === "/" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Home</p>
                        <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/" ? "":"hidden"}`}/>
                </NavLink>

       <NavLink  to="/agents" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full"  onClick={()=>{
         setLocation('/agents')
       }}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/agents' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
<p className={`text-xs ${location === "/agents" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Agents</p>
<div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/agents" ? "":"hidden"}`}/>
                </NavLink>
          

              <NavLink  to="/chats" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
                setLocation('/chats')
              }}>
              <svg xmlns="http://www.w3.org/2000/svg"  className={`w-6 h-6 stroke-current ${location === '/chats' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className={`text-xs ${location === "/chats" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Chats</p>
        <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/chats" ? "":"hidden"}`}/> 
                </NavLink>
          
                <NavLink to="/traffic" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
         setLocation('/traffic')
       }}>
                        <svg className={`w-6 h-6 stroke-current ${location === '/crm' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                        <p className={`text-xs ${location === "/traffic" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>traffic</p>
                        <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/traffic" ? "":"hidden"}`}/> 
                </NavLink>  
           


                <NavLink to="/crm" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
         setLocation('/crm')
       }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/crm' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className={`text-xs ${location === "/crm" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>CRM</p>
                        <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/crm" ? "":"hidden"}`}/> 
                </NavLink>

             
       </div>

       


       <div className="flex flex-col  items-center max-w-full">
            
                <NavLink to="/profile" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
                  setLocation('/profile')
                }}>
                  
                          <div className="relative">
                                <div className={`${connected ? 'bg-green-500':'bg-red-500'} w-3 h-3 rounded-full absolute border-3 group-hover:borer-gray-active border-black-nav -right-0 bottom-0`}/>
                                <svg className={`w-6 h-6 stroke-current ${location === '/profile' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </div>
                        <p className={`text-xs ${location === "/profile" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Profile</p>
                        <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/profile" ? "":"hidden"}`}/> 
                  </NavLink>
          
                
           

                <NavLink to="/settings" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
                  setLocation('/settings')
                }}>
              
                <svg className={`w-6 h-6 stroke-current ${location === '/settings' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <p className={`text-xs ${location === "/settings" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Settings</p>
                      <div className={`h-full absolute w-1 rounded-full bg-yellow-500 left-0 top-0 ${location === "/settings" ? "":"hidden"}`}/> 
                </NavLink>
               
       </div>
        
     </div>

     {/* end navbar */}

     <div className="bg-white flex-1 ">
       <Switch>
       <Route exact path="/">
       <Home location={{setLocation:setLocation,location:location}}/>
         </Route>
         <Route exact path="/settings">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">Settings</p></div>
         </Route>

         <Route exact path="/chats">
           <Chats/>
         </Route>
         <Route exact path="/agents">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">Agents Comming Soon</p></div>
         </Route>

         <Route exact path="/crm">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">CRM comming soon!</p></div>
         </Route>

         <Route exact path="/traffic">
            <Traffic/>
         </Route>
         <Route exact path="/profile">
         <div className="flex flex-col justify-center items-center w-full h-full"><p className="text-xl ">
           Profile</p>
           <ReactLogo className="w-20 h-20"/>
           </div>
         </Route>
       </Switch>
     </div>
    </div>
    </Router> 
  );
}

export default Dashboard;
