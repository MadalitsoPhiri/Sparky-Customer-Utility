import React from "react";
import {socket as connection} from "./service/socket";
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom" 
import {ReactComponent as ReactLogo} from './under_constrruction.svg';




function App() {

  const socket = React.useRef();
 const [connected,setConnected] = React.useState(false)
 const [location,setLocation] = React.useState('/')
 const [agents,setagents] = React.useState(0)
 const [clients,setclients] = React.useState(0)


 React.useEffect(()=>{
  socket.current = connection
  socket.current.on("connect", () => {
    console.log("connected"); // prints { x: "42", EIO: "4", transport: "polling" }
    setConnected(true)
   socket.current.emit('agent-logged-in')
   });
   socket.current.on('num-agents',(number)=>{
    setagents(number)
  })

  socket.current.on('client-connected',(number)=>{
    setclients(number)
  })
  socket.current.on('client-disconnected',number=>{
    setclients(number)
  })
   socket.current.on("connect_error", (socket) => {
    console.log("failed to connect"); // prints { x: "42", EIO: "4", transport: "polling" }
    setConnected(false)

   
   });

  
 },[])

  return (
    <Router>
    <div className="flex flex-row w-screen h-screen">
      {/* navbar */}
     <div className="flex flex-col h-full py-2 bg-black-nav justify-between">
      
       <div className="flex flex-col  items-center max-w-full">
       <div className="flex flex-col  items-center max-w-full my-2">
         <p className="text-yellow-500 text-4xl">S</p>
       </div>

       <NavLink  to="/" className="group flex flex-col hover:bg-gray-active p-4 items-center w-full relative" onClick={()=>{
         setLocation('/')
       }}>
     <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
                        <p className={`text-xs ${location === "/" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Home</p>
                        <div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/" ? "":"hidden"}`}/>
                </NavLink>

       <NavLink  to="/agents" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full"  onClick={()=>{
         setLocation('/agents')
       }}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/agents' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
<p className={`text-xs ${location === "/agents" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Agents</p>
<div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/agents" ? "":"hidden"}`}/>
                </NavLink>
          

              <NavLink  to="/chats" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
                setLocation('/chats')
              }}>
              <svg xmlns="http://www.w3.org/2000/svg"  className={`w-6 h-6 stroke-current ${location === '/chats' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className={`text-xs ${location === "/chats" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Chats</p>
        <div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/chats" ? "":"hidden"}`}/> 
                </NavLink>
          
                
           


                <NavLink to="/crm" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
         setLocation('/crm')
       }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 stroke-current ${location === '/crm' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className={`text-xs ${location === "/crm" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>CRM</p>
                        <div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/crm" ? "":"hidden"}`}/> 
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
                        <div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/profile" ? "":"hidden"}`}/> 
                  </NavLink>
          
                
           

                <NavLink to="/settings" className="relative group flex flex-col hover:bg-gray-active p-4 items-center w-full" onClick={()=>{
                  setLocation('/settings')
                }}>
              
                <svg className={`w-6 h-6 stroke-current ${location === '/settings' ?'text-gray-100':'text-gray-inactive'} group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <p className={`text-xs ${location === "/settings" ?'text-gray-100' :'text-gray-inactive'} group-hover:text-gray-100`}>Settings</p>
                      <div className={`h-full absolute w-1 bg-yellow-500 left-0 top-0 ${location === "/settings" ? "":"hidden"}`}/> 
                </NavLink>
               
       </div>
        
     </div>

     {/* end navbar */}

     <div className="bg-white w-full">
       <Switch>
       <Route exact path="/">
       <div className="flex flex-row justify-center items-center w-full h-full">
         <div className="m-auto w-10/12 h-5/6 flex flex-col gap-20">
           <div className="w-full flex flex-row justify-between">

                <div className="flex flex-row gap-5">
                                        <div className="relative ">
                                              <div className="bg-blue-500 w-6 h-6 rounded-full absolute border-3  border-white -right-0 bottom-0 p-1">
                                              <svg xmlns="http://www.w3.org/2000/svg" className=" text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                                              </div>
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-full stroke-current text-gray-inactive group-hover:text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
                                        </div>
                          <div className="flex flex-col gap-2">
                                <p className="text-2xl font-bold text-black-nav">Good day, Madalitso!</p>
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
                <p className="font-bold text-black-nav text-4xl">{clients}</p>
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
                <p className="font-bold text-black-nav text-4xl">{agents}</p>
               </NavLink>
              </div>
              <p className="p-4"><span className="font-medium">Tip:</span> Forward your email to Sparknspur so you can manage all your conversations in one place.</p>
             
           </div>

</div>




         </div>
         </div>
         </Route>
         <Route exact path="/settings">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">Settings</p></div>
         </Route>

         <Route exact path="/chats">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">Chats comming soon</p></div>
         </Route>
         <Route exact path="/agents">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">Agents Comming Soon</p></div>
         </Route>

         <Route exact path="/crm">
             <div className="flex flex-row justify-center items-center w-full h-full"><p className="text-xl ">CRM comming soon!</p></div>
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

export default App;
