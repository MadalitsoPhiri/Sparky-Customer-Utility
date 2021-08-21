import React,{useContext,useEffect,useState}from 'react'
import {ReactComponent as NoChatLogo} from '../assets/undraw_No_chats.svg';
import { AuthContext } from './contexts/AuthContext';
import Conversation from './Conversation';

export default function Chats() {
    const {user,connected,socket,agentInfo} = useContext(AuthContext);
    const [conversations,setConversations] = useState([])
    const [message,setMessage] = useState("")

    const [feed,setFeed] = useState(null)
    const [loading,setLoading] = useState(true)
    const handleMessageChange = (e)=>{
       setMessage(e.target.value)
    }
    const handleOnChatSelected = (item)=>{
          setFeed(item)
    }
    useEffect(async() => {
       
       try{
         const response = await fetch(`http://localhost:5000/api/conversations/${user.agentId}`)
         const json = await response.json()
         console.log(json)
         setConversations(json.conversations)
         setLoading(false)
       }catch(err){
        console.log(err)   
       }
    }, []) 
    return (
        <div className="w-full h-full flex flex-row bg-white">
           {/* <div className="flex flex-row w-full border-r border-l border-gray-border">
               <div className="w-2/6 flex flex-row justify-start p-4 border-r border-gray-border">
               <div className=" flex flex-row justify-between w-full">
                   <div className="flex flex-row items-center gap-3">
                   <div className="relative">
                   <div className={`${connected ? 'bg-green-500':'bg-red-500'} w-3 h-3 rounded-full absolute border-3 group-hover:borer-gray-active border-white -right-0 bottom-0`}/>
                            
                            <svg className={`w-8 h-8 stroke-current 'text-gray-100' group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <p>{user.username}</p>
                   </div>
                 
                                
                                <p className="text-lg font-medium text-gray-500">Chats</p>
                </div>
                
               </div>
               <div className="flex-1  flex flex-row justify-between border p-4  bg-white">
                   <div className="gap-3 items-center flex flex-row">
                       <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                       <div className="bg-gray-300 rounded-full w-32 h-4"></div>

                   </div>
                   <p className="text-lg font-medium text-gray-500">Chat feed</p>
               </div>
            
           </div> */}

           {/* this is chat segment */}
           {/* <div className="flex  flex-row w-full h-full border border-gray-border">
               <div className="w-2/6  flex flex-col border-r border-gray-border overflow-y-auto">
               { conversations.length === 0 ? <> <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>
                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div></>:conversations.map((item,index)=>{
                        return <div onClick={()=>handleOnChatSelected(item)}> <Conversation conversation={item} /></div>
                
                    })}
                        
                    </div>



               {Conversation.length == 0 ?<div className="flex-1  flex flex-row border p-4 bg-white background-pattern1">
               <div className="flex flex-col w-full h-full items-center justify-center gap-10">
               <svg class="w-20 h-20 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
               <button className="bg-yellow-500 px-4 py-2 rounded-xl flex flex-row text-white text-lg"><span><svg class="w-6 h-6 text-white text-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></span>Explore Traffic</button>
               </div>
               
               </div>:feed == null? <div className="flex-1  flex flex-row border p-4 bg-white background-pattern1 justify-center items-center text-xl font-medium">
                        <p>Select a Chat to see its feed.</p>
               
               </div>:
               <div className="flex-1 border p-4 bg-white background-pattern1 w-full">
                 
                   <p className="bg-yellow-500 p-2 max-w-1/2 rounded-lg  break-words">Hello there can i help you dmkdmdkfmdfkdmfkdmfkdfmkfkdfmkdmfkdmfkdgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
                
               
      
      </div>
               }

           </div> */}

           {/* convsersation panel */}
         <div className="border-r border-gray-300 h-full w-4/12">
                <div className=" flex flex-row justify-between w-full p-4 border-b border-gray-300">
                        <div className="flex flex-row items-center gap-3">
                        <div className="relative">
                        <div className={`${connected ? 'bg-green-500':'bg-red-500'} w-3 h-3 rounded-full absolute border-3 group-hover:borer-gray-active border-white -right-0 bottom-0`}/>
                                    
                                    <svg className={`w-8 h-8 stroke-current 'text-gray-100' group-hover:text-gray-100 `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <p className="font-semibold text-base">{user.username}</p>
                        </div>
                        
                                        
                                        <p className="text-lg font-medium text-gray-500">Chats</p>
                </div>

                <div className="flex flex-col overflow-y-auto">
               { conversations.length === 0 ? <> <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>
                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div>

                        <div class=" flex flex-row gap-4 p-4">
                            <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                            <div className="flex flex-col flex-1 gap-4 mr-10">
                            <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                            <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                            </div>
                            
                        </div></>:conversations.map((item,index)=>{
                        return <div onClick={()=>handleOnChatSelected(item)}> <Conversation conversation={item} /></div>
                
                    })}
                        
                    </div>

         </div>
         {/* conversation feed */}
         <div className="border-r border-gray-300 h-full flex-1 flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-300 p-4  bg-white">
                   <div className="gap-3 items-center flex flex-row">
                       <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                       <div className="bg-gray-300 rounded-full w-32 h-4"></div>

                   </div>
                   <p className="text-lg font-medium text-gray-500">Chat feed</p>
               </div>
               {/* feed body */}
               <div className="bg-white flex-1 w-full overflow-y-auto p-4 flex flex-col gap-5"> 
               <p className="bg-yellow-500 p-4 max-w-1/2 rounded-xl  break-words text-white self-end">Hello there can i help you dmkdmdkfmdfkdmfkdmfkdfmkfkdfmkdmfkdmfkdgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
               <p className="bg-gray-200 p-4 max-w-1/2 rounded-xl  break-words text-black self-start">Hello there can i help you </p>
               </div>
               <div className="border-t border-gray-300  w-full p-2 flex flex-row gap-5 justify-center items-center"> 
               <input name="password" placeholder="Type message here...." value={message} onChange={handleMessageChange} className="flex-1 text-lg outline-none border rounded-full p-2 "/>
               <button className="rounded-full bg-yellow-500 w-10 h-10 flex flex-row justify-center items-center"><svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
               </div>
               
               
         </div>
         

        </div>
    )
}
