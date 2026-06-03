import { AuthContext } from 'context/AuthContext'
import Login from 'pages/Authentication/Login/Login'
import React, { useContext } from 'react'

export default function PrivateRoute(props)
{

        const {isAuthentication } = useContext(AuthContext)
      

        const {Component} = props

        if(!isAuthentication)
        
        return <Login /> 


  return (

  <Component />
  )
}
