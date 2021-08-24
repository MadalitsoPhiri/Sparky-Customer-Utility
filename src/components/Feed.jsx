import React,{useState,useEffect,useContext} from 'react'
import Message from './Message'
import { AuthContext } from './contexts/AuthContext'



export default function Feed({conversation}) {
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState("")
    const [customer,setCustomer] = useState(null)
    const {user,connected,agentInfo,socket} = useContext(AuthContext);
    const handleMessageChange = (e)=>{
        setMessage(e.target.value)
     }
    const handleMessageSend = (e)=>{
          if(message != ""){
           socket.emit('newMessage',{conversation,message,agentId:user.agentId},()=>{})
          }
    } 
    useEffect(async() => {
        let customerId = conversation.members.filter((item)=>{
            console.log(item)
            return item != user.agentId
        })
        console.log('customerId:',customerId[0])

        try{
     const response = await fetch(`http://localhost:5000/api/customers/${customerId[0]}`) 
     const json = await response.json()
     setCustomer(json.customer)
     console.log(json)
   }catch(err){
           console.log(err)
   }

        console.log(conversation._id)
        console.log(user.agentId)
        socket?.emit('getConMessages',conversation._id,(err)=>{
          console.log(err)
        })
    socket?.on('conMessages',(msg)=>{
      setMessages(msg.messages)
    console.log(msg)
    })
    socket?.on('onNewMessage',(msg)=>{
       if(msg.conversationId == conversation._id){
        setMessages(old =>[...old,msg])
       }else{
           console.log('different message')
       }
    
    })
    
       
    }, [conversation])







    return (
        <div className="border-r border-gray-300 h-full flex-1 flex flex-col ">
        <div className="flex flex-row justify-between border-b border-gray-300 p-4 ">
           <div className="gap-3 items-center flex flex-row">
           {customer?.profilePicture == ""?<svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>:<div className="bg-gray-300 rounded-full w-8 h-8"></div>}
              {customer?.username != null? <p>{customer.username}</p>: <div className="bg-gray-300 rounded-full w-32 h-4"></div>}

           </div>
           <p className="text-lg font-medium text-gray-500 ">Chat feed</p>
       </div>
       {/* feed body */}
       <div className=" flex-1 w-full overflow-y-auto p-4 flex flex-col gap-5">
          {messages.map((item,index)=>{
              return <Message msg={item} key={index}/>
          })}
    
        
       </div>
       <div className="border-t border-gray-300  w-full p-2 flex flex-row gap-5 justify-center items-center"> 
       <input name="message" placeholder="Type message here...." value={message} onChange={handleMessageChange} className="flex-1 text-lg outline-none border rounded-full p-2 "/>
       <button onClick={handleMessageSend} className="rounded-full bg-yellow-500 w-10 h-10 flex flex-row justify-center items-center"><svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
       </div>
       
       
 </div>
    )
}
