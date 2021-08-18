import { faVestPatches } from "@fortawesome/free-solid-svg-icons";
import {socket} from "../../service/socket";
import React, { useState,useEffect } from "react";


export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [connected,setConnected] = useState(false);
  const [agentInfo,setAgentInfo] = useState(false);



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        connected,
        setConnected,
        socket,
        agentInfo,
        setAgentInfo,
        login:async (email,password) => {
          const response = await fetch('http://localhost:5000/api/auth/login',{method:"POST",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            "email":email,
            "password":password
           })
          })
        let json = await response.json()
         console.log(json)
           if(response.status === 400){
            console.log("Wrong password")
            return "Wrong password"
           }
           if(response.status === 404){
            console.log("User does not exist")
            return "User does not exist"
           }

           if(response.status === 200){
            console.log("Logged in successfully")
            setUser(json.payload)
            return "Logged in"
           }
 
 
         },
        logout: async () => {
        


        },
        register: async(username,email,password) => {
          const response = await fetch('http://localhost:5000/api/auth/register',{method:"POST",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            "username":username,
            "email":email,
            "password":password
           })
          })
        let json = await response.json()
        if(response.status === 422){
         
          return  json.message
         }
        

         if(response.status === 200){
          console.log("Signedup successfully")
         
          return "Registered"
         }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};