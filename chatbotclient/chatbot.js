let head = document.querySelector('head')
   let socketScript =  document.createElement('script')
   socketScript.src= "https://cdn.socket.io/3.1.3/socket.io.min.js"
   socketScript.integrity ="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
   socketScript.crossOrigin = "anonymous"
   head.append(socketScript)
let styleTag = document.createElement('style')
styleTag.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.appContainer{
    background-color: rgb(224, 231, 231);
    flex:1;
    }
    #sparkyChatbot_dialog{
     position: fixed;   
     width:320px;
     height: 90%;
     right:1rem;
     top:5%;
     bottom: 5%;
     box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
     border-radius:1rem;
     transition: transform 0.3s ease-in-out;
     display: flex;
     flex-direction: column;

    }
    .sparkyChatbot_chatbotButton{
     position: fixed;
     right:1rem;
     bottom:1rem;
     background-color:  #F59E0B;
     width: 2rem;
     height: 2rem;
     border:none;
     border-radius: 50%;
     padding:0.7rem;
     display: flex;
     justify-content: center;
     align-items: center;
     cursor: pointer;
     box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
     transition: transform 0.3s ease-in-out;
    

    }
    .sparkyChatbot_chatbotButton:hover .sparkyChatbot_buttonLogo{
     transition:transform 0.4s ease-out;   
     transform: scale(1.4);
    

    }
    .sparkyChatbot_buttonLogo{
    transition:transform 0.4s ease-out; 
    color:white;
    width:1.5rem; 
    height:1.5rem  
    }
    .hidden{
        display: none;
    }
    .animate-out{
        transform: translateY(150%);
        transition: transform 0.3s ease-in-out;
    }
    .dialog-hidden{
        transform: translateY(150%);
        transition: transform 0.3s ease-in-out;
    }
    .sparkyChatbot_chatbotHeader{
        background-color: #F59E0B;
        padding-right: 1rem;
        padding-left: 1rem;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sparkyChatbot_headerLogo{
     width:2rem;
     height: 2rem;
     color:white;
    }
    .sparkyChatbot_closeButton{
        width:1.5rem;
     height: 1.5rem;
     color:white;
     cursor: pointer;
    }
    .sparkyChatbot_HeaderText{
        color: white;
        font-family: Poppins,sans-serif;
        font-weight:bold;
        font-size: 1rem;
    }
    .sparkyChatbot_footer{
         display: flex;
         width:100%;
         justify-content: center;
         align-items: center;
    }
    .sparkyChatbot_footer_text{
        font-family: Poppins,sans-serif;
        font-weight: 500;
        font-size: 0.6rem;
    }
`
head.appendChild(styleTag)
//build chatbot button








const registerUiEvents = ()=>{
    let chatbotButton =  document.getElementById("sparkyChatbot_chatbotButton")
        let chatbotDialog = document.getElementById("sparkyChatbot_dialog")
        let closeButton = document.getElementById('sparkyChatbot_closeButton')
        chatbotButton.addEventListener('click',(e)=>{
          console.log("chatbotbutton clicked!")
          chatbotButton.classList.add('animate-out')
          chatbotDialog.classList.remove('dialog-hidden')
        })

        closeButton.addEventListener('click',(e)=>{
          console.log("closeButton clicked!")
          chatbotButton.classList.remove('animate-out')
          chatbotDialog.classList.add('dialog-hidden')
        })
}

const myPlugin = () => {
    console.log("loaded")
   
  


const SOCKET_URL = 'ws://localhost:5000';
const socket = io(SOCKET_URL);

socket.on('connect',()=>{
    console.log('connected to chat server')
})

let body = document.querySelector('body')
let dialog = document.createElement('div')
dialog.id = "sparkyChatbot_dialog"
dialog.classList.add("sparkyChatbot_chatbotDialog","dialog-hidden")
dialog.innerHTML = `
<div class="sparkyChatbot_chatbotHeader">
           
<svg class="sparkyChatbot_headerLogo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
<p class="sparkyChatbot_HeaderText">Lets chat!</p>
<svg id="sparkyChatbot_closeButton" class="sparkyChatbot_closeButton" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

</div>
<div id="app" class="appContainer"></div>
<div class="sparkyChatbot_footer"><p class="sparkyChatbot_footer_text">powered by <span style="color:#F59E0B">sparky</span></p></div>      
`

let button = document.createElement('div')
button.id = "sparkyChatbot_chatbotButton"
button.classList.add("sparkyChatbot_chatbotButton")
button.innerHTML = `
<svg class="sparkyChatbot_buttonLogo" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
`





body.appendChild(button)
body.appendChild(dialog)












registerUiEvents()

  }
  
  /** 
   *  Checks the document readyState until it's ready
   */
  (ready = (delay) => {
    // this is always 'complete' if everything on the page is loaded,
    // if you want to check for a state when all html/js is loaded but not all assets, check for 'interactive'
    if (document.readyState == 'complete') {
      myPlugin() // your stuff being invoked when doc is ready
    } else {
      console.log('Retrying!')
      setTimeout(() => { ready(delay) }, delay)
    }
  })(50)