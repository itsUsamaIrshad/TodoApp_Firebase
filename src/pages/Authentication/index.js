import React from 'react'
import { Routes , Route } from 'react-router-dom'
import ForgetPassword from './ForgetPassword'
import Login from './Login'
import Phnumber from './PhoneLog/Phnumber'
import Register from './Register'


export default function index() {
  return (




    <Routes>

    
    <Route  path='/' >

<Route path='/login' element={<Login/>}/>

<Route path='/register' element={<Register/>}/>

<Route path='/forgetPassword' element={<ForgetPassword />}/>

<Route path='/phnumber' element={<Phnumber />}/>

    </Route>
  

    </Routes>


  )
}
