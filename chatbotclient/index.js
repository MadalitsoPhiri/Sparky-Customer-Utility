const chatInterface =  document.getElementById('chatInterface');
const messageContainer = document.getElementById('messageContainer');
const message = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
const chatbotButton = document.getElementById('chatbotButton');
const closeButton = document.getElementById('close');
const SOCKET_URL = 'ws://localhost:5000';
const socket = io(SOCKET_URL);

socket.on('connect',()=>{
    console.log('connected to chat server')
})

socket.on('response',(res)=>{
    const sendMessagetag = document.createElement('p')
    sendMessagetag.classList.add( "chat-bubble", "self-end", "p-2",  "bg-yellow-500", "rounded-tl-xl", "rounded-br-xl", "rounded-bl-xl" ,"text-white" ,"break-words" ,"text-xs")
    sendMessagetag.innerHTML = res
    messageContainer.appendChild(sendMessagetag);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
})
let isOpen = false;

chatbotButton.addEventListener('click',(e)=>{
    if(isOpen){
       
        // chatInterface.classList.add('hidden')
        chatInterface.classList.add('dialog-fade')
      
        isOpen = false
    }else{
       
        // chatInterface.classList.remove('hidden')
        chatbotButton.classList.add('fade-out')
        chatInterface.classList.remove('dialog-fade')

        
        isOpen = true
    }
 
})

closeButton.addEventListener('click',(e)=>{
    if(isOpen){
        chatInterface.classList.add('dialog-fade')
        chatbotButton.classList.remove('fade-out')
        isOpen = false
       
    }else{
       
        chatInterface.classList.remove('hidden')
        isOpen = true
    }
 
})

sendButton.addEventListener('click',()=>{
    if(message.value != ""){
        const sendMessagetag = document.createElement('p')
        sendMessagetag.classList.add("chat-bubble","self-start","p-2","w-1/2","bg-gray-200","rounded-bl-xl","rounded-tr-xl","rounded-br-xl","text-black","break-words","text-xs")
        sendMessagetag.innerHTML = message.value
        messageContainer.appendChild(sendMessagetag);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        socket.emit('message',message.value)
        message.value = ""
      
    }
})