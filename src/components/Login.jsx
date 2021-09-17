import React,{useEffect, useState, useContext} from 'react'
import {useHistory, Link } from "react-router-dom"
import { AuthContext } from './contexts/AuthContext';


export default function Login() {
    const history = useHistory()
    const {login} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')


    const handleLogin = async(e)=>{
      e.preventDefault()
        console.log(`password is ${password} and email is ${email}`)
       
        if(email == ""){
            setError("Email must be entered.")
            return
        }else if(password == ""){
            setError("Password must be entered.")
            return
        }else{
            setError("")
            let result = await login(email.toLowerCase(),password)
            if(result === "Wrong password" ){
                setError("Wrong password")
            }else if(result === "User does not exist"){
                setError("User does not exist")
            }else if(result === "Logged in"){
                setError("")
                history.push("/")
                console.log(result)
            }else{
                console.log("Fatal Error")
            }
           
        }

       
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    
    return (
    //     <div className="flex flex-col gap-5 w-screen h-screen justify-center items-center">
    //         <div className="border bg-white w-96  rounded-xl flex flex-col items-center">
    //             <div className="flex flex-row bg-yellow-500 w-full p-4 rounded-tl-xl rounded-tr-xl gap-2">
    //             <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    //             <p className="text-white font-bold text-lg">Login</p>
    //             </div>
    //             <div className="flex flex-col p-4 w-full gap-5 items-center">
    //             <input name="email" placeholder="Email" value={email} onChange={handleEmailChange} className="w-full text-lg outline-none p-2 border rounded-lg" />
    //             <input name="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="w-full text-lg outline-none border rounded-lg p-2 "/>
    //             <button onClick={handleLogin}  className="py-2  bg-yellow-500 rounded-xl w-full my-4 text-white font-bold text-lg hover:bg-yellow-400">Login</button>
    //             {error && <p className="text-red-500 ">{error}</p>}
    //             </div>
             
    //         </div>
    //         <p>Dont have account? <Link to="/signup" className="text-yellow-500">Register</Link></p>
    // </div>



<div class="min-h-screen bg-white flex">
<div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
    <svg class="h-12 w-auto text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
   
     
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      
    </div>

    <div class="mt-8">
      <div>
        <div>
          <p class="text-sm font-medium text-gray-700">
            Sign in with
          </p>

          <div class="mt-1 grid grid-cols-3 gap-3">
            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Facebook</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>

            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Twitter</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>

            <div>
              <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with GitHub</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input name="email" placeholder="Email" value={email} onChange={handleEmailChange} id="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-light focus:border-purple-light sm:text-sm"/>
            </div>
          </div>

          <div class="space-y-1">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input  value={password} onChange={handlePasswordChange} id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-light focus:border-purple-light sm:text-sm"/>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-purple-base focus:ring-purple-light border-gray-300 rounded"/>
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-purple-base hover:text-purple-light">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button onClick={handleLogin} type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-base hover:bg-purple-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="hidden lg:block relative w-0 flex-1">
  <img class="absolute inset-0 h-full w-full object-cover" src="https://static.wixstatic.com/media/ba701c_4fdbb39d900a449fa6af08659c686cc0~mv2.jpg/v1/fill/w_980,h_969,al_c,q_85,usm_0.66_1.00_0.01/ba701c_4fdbb39d900a449fa6af08659c686cc0~mv2.webp" alt=""/>
  <div class="absolute inset-0 h-full w-full bg-purple-light bg-opacity-50"></div>
</div>
</div>

    )
}
