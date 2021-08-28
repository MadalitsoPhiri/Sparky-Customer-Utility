import React,{useContext} from 'react'
import { AuthContext } from './contexts/AuthContext'
import { useHistory } from 'react-router'

export default function Queued() {
    const {agentInfo,user} = useContext(AuthContext)
    const history = useHistory()
    const handleClientClick = async(customer)=>{
       let receiverId = customer.user._id
       const payload = {
        receiverId,
        senderId:user.agentId
        
    }
    console.log(payload)
     const response = await fetch('http://localhost:5000/api/conversations',{method:"POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body:JSON.stringify(payload)
      }) 
      const data = await response.json()
      console.log(data)
       history.push('/chats')
    }
    return (
        <div className="w-full h-full flex flex-col p-2">
            {agentInfo.QueuedCustomers.map((item,index)=>{
               return <div onClick={(e)=>handleClientClick(item)} className="w-full h-20 bg-gray-200 cursor-pointer border-2 border-gray-500" key={index}>
                   <p>{item.user.username}</p>
               </div>
            })}
        </div>
    )
}
