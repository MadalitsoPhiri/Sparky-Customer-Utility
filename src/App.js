import React,{useState,useEffect,useContext} from "react";
import {BrowserRouter as Router, Route, Switch, NavLink,useHistory } from "react-router-dom" 
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import {AuthContext} from "./components/contexts/AuthContext"





function App() {
  const {user,setConnected,socket,setAgentInfo} = useContext(AuthContext) 
  useEffect(()=>{
    socket.on("connect", () => {
      console.log("connected"); // prints { x: "42", EIO: "4", transport: "polling" }
      setConnected(true)
      if(user != null){
        socket.emit('agentLoggedIn',user)
      }else{
        console.log("user ws nul")
        console.log(user)
      }
    
     });

      socket.on("connect_error", (socket) => {
      console.log("failed to connect"); // prints { x: "42", EIO: "4", transport: "polling" }
      setConnected(false)
      return () => socket.disconnect();
     
     });

     socket.on('agent-info',(data)=>{
      
      console.log(data)
      setAgentInfo(data)

     })
  },[setConnected,user])


return(
 
  <Router>
    
    <Switch>
 
        <PrivateRoute exact path="/" component={Dashboard}/>
    
        <Route exact path="/login" component={Login}/>
        
      
        <Route exact path="/signup" component={Register}/>
   
    </Switch>
  </Router>
)


    
}

export default App;
