import React,{useState,useContext}from 'react';
import {Redirect, Route} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

export default function PrivateRoute({component:Component,...rest}) {
    const {user} = useContext(AuthContext)
    return (
        <Route  {...rest} render={props=>{
         return user ? <Component {...props}/> : <Redirect to="/login"/>
        }}>
           
        </Route>
    )
}
