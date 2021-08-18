import React from 'react'
import {ReactComponent as NoChatLogo} from '../assets/undraw_No_chats.svg';

export default function Chats() {
    return (
        <div className="w-full h-full flex flex-col bg-gray-100">
           <div className="flex flex-row w-full ">
               <div className="w-2/6 flex flex-row justify-start p-4 border">
                   <p className="text-lg font-medium text-gray-500">Chats</p>
               </div>
               <div className="flex-1  flex flex-row justify-center border p-4  bg-white">
                   <p className="text-lg font-medium text-gray-500">Chat feed</p>
               </div>
            
           </div>

           {/* this is chat segment */}
           <div className="flex flex-row w-full h-full  border">
           <div className="w-2/6  flex flex-col  p-4 border gap-10 overflow-y-auto">
                 <div class=" flex flex-row gap-4">
                     <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                     <div className="flex flex-col flex-1 gap-4 mr-10">
                     <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                     <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                     </div>
                     
                 </div>

                 <div class=" flex flex-row gap-4">
                     <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                     <div className="flex flex-col flex-1 gap-4 mr-10">
                     <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                     <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                     </div>
                     
                 </div>
                 <div class=" flex flex-row gap-4">
                     <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                     <div className="flex flex-col flex-1 gap-4 mr-10">
                     <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                     <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                     </div>
                     
                 </div>

                 <div class=" flex flex-row gap-4">
                     <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                     <div className="flex flex-col flex-1 gap-4 mr-10">
                     <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                     <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                     </div>
                     
                 </div>

                 <div class=" flex flex-row gap-4">
                     <div className="rounded-full bg-gray-300 h-14 w-14  ml-2"></div>
                     <div className="flex flex-col flex-1 gap-4 mr-10">
                     <div className="rounded-full bg-gray-300 h-5 w-3/4"></div>
                     <div className="rounded-full bg-gray-300 h-5 w-full"></div>
                     </div>
                     
                 </div>
               


                 
               </div>
               <div className="flex-1  flex flex-row border p-4 bg-white background-pattern1">
               <div className="flex flex-col w-full h-full items-center justify-center gap-10">
               <svg class="w-20 h-20 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
               <button className="bg-yellow-500 px-4 py-2 rounded-xl flex flex-row text-white text-lg"><span><svg class="w-6 h-6 text-white text-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></span>start chatting</button>
               </div>
               
               </div>

           </div>

           




        </div>
    )
}
