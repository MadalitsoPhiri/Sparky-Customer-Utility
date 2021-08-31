import React,{useEffect,useContext,useState}from 'react';
import { AuthContext } from './contexts/AuthContext';
import {format} from "timeago.js"


export default function Conversation({conversation}) {
    const {user,connected,socket,agentInfo} = useContext(AuthContext);
    const [customer,setCustomer] = useState(null)

    useEffect(async() => {
        console.log(conversation)
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
    }, [])
    // flex flex-row gap-4 p-4

    return (
        <div className="group flex flex-row gap-2 py-2 px-4 hover:bg-gray-200 items-center">

                { customer != null ? customer.profilePicture != "" ?<div className="rounded-full bg-gray-300 h-14 w-14 flex-shrink-0"></div>:<svg className="w-14 h-14 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>:<div className="rounded-full bg-gray-300 h-14 w-14"></div>}
               <div className="flex flex-col gap-3 overflow-x-hidden w-full">
                   
                    <div className="flex flex-row justify-between items-center gap-1">
                        
                    <p className="h-5  text text-left truncate font-bold">{customer?.username}</p>
                    <p className="h-5  text text-right truncate ">{format(conversation?.updatedAt)}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center gap-2">
                            <p className="h-5 flex-1 text text-left truncate text-sm ">{conversation?.lastMessage}</p>
                            <div className="flex flex-row gap-1">
                                    {/* <div className="rounded-full  h-5 px-1 bg-yellow-500 flex flex-row justify-center items-center text-white text-xs font-bold">10</div> */}
                                    <button className="hidden group-hover:block h-5"><svg className=" text-gray-500 h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                            </div>
                   
                    </div>
                    

                </div>
              
        </div>
    )
}
