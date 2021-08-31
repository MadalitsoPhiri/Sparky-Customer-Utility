import React,{useEffect, useState, useContext} from 'react'
import {useHistory } from "react-router-dom"
import { AuthContext } from './contexts/AuthContext';


export default function Register() {
    const history = useHistory()
    const {register} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')


    const handleRegister = async()=>{
        console.log(`password is ${password} and email is ${email}`)
       
        if(email == ""){
            setError("Email must be entered.")
            return
        }else if(password == ""){
            setError("Password must be entered.")
            return
        }else if(username == ""){
            setError("username must be entered.")
            return
        
        
        }else{
            setError("")
            let result = await register(username.toLowerCase(),email.toLowerCase(),password)
            if(result === "Wrong password" ){
                setError("Wrong password")
            }else if(result === "User does not exist"){
                setError("User does not exist")
            }else if(result === "Registered"){
                setError("")
                history.push("/login")
                console.log(result)
            }else{
                console.log("Fatal Error")
                setError("Internal server Error")
            }
           
        }

       
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    const handleUserNameChange = (e)=>{
        setUsername(e.target.value)
    }
    
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="border bg-white w-96  rounded-xl flex flex-col items-center">
                <div className="flex flex-row bg-yellow-500 w-full p-4 rounded-tl-xl rounded-tr-xl gap-2">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <p className="text-white font-bold text-lg">Register</p>
                </div>
                <div className="flex flex-col p-4 w-full gap-5 items-center">
                <input name="username" placeholder="Username" value={username} onChange={handleUserNameChange} className="w-full text-lg outline-none p-2 border rounded-lg" />
                <input name="email" placeholder="Email" value={email} onChange={handleEmailChange} className="w-full text-lg outline-none p-2 border rounded-lg" />
                <input name="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="w-full text-lg outline-none border rounded-lg p-2 "/>
                <button onClick={handleRegister}  className="py-2  bg-yellow-500 rounded-xl w-full my-4 text-white font-bold text-lg hover:bg-yellow-400">Register</button>
                {error && <p className="text-red-500 ">{error}</p>}
                </div>
              
            </div>
      
    </div>
    )
}
