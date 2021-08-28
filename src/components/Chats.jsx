import React,{useContext,useEffect,useState}from 'react'
import {ReactComponent as NoChatLogo} from '../assets/undraw_No_chats.svg';
import { AuthContext } from './contexts/AuthContext';
import Conversation from './Conversation';
import Feed from './Feed';
import FeedLoading from './FeedLoading';
import NoConversation from './NoConversation';
import SelectChat from './SelectChat';

export default function Chats({history}) {
    const {user,connected,socket,agentInfo} = useContext(AuthContext);
    const [conversations,setConversations] = useState([])
  
    const skeleton = [1,2,3,4,5,6,7,8,9]
    const [feed,setFeed] = useState(null)
    const [loading,setLoading] = useState(true)
  
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

       socket.on('onNewConversation',(conversation)=>{
          console.log("newConversation",conversation)
          setConversations(old =>[...old,conversation])
       })
    }, []) 
    return (
        <div className="h-full flex flex-row bg-white">

           {/* convsersation panel */}
            <div className="border-r border-gray-300 h-full  w-1/3">
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

                    <div className="flex flex-col overflow-y-auto w-full">
                { conversations.length === 0 ? <>
                {skeleton.map(()=>{
           
           return <div class=" flex flex-row gap-4 p-4">
                <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                <div className="flex flex-col flex-1 gap-4 ">
                <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                </div>
           
            </div>
                
                })}
                </>:conversations.map((item,index)=>{
                            return <div onClick={(e)=>{
                                setFeed(item)
                            }}> <Conversation conversation={item} key={index}/></div>
                    
                        })}
                            
                        </div>

            </div>



         {/* conversation feed */}
         {loading? <FeedLoading/>:conversations.length ===  0 ?<NoConversation history={history}/> :feed != null ?<Feed conversation={feed}/>:<SelectChat/>}
          
         

        </div>
    )
}
