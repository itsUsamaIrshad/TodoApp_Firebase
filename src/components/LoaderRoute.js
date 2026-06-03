import { auth } from 'Config/firebase'
import React  from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import Loader from 'pages/Loader'
import { useState } from 'react'

export default function LoaderRoute(props)
{

    const [loaderValue, setLoaderValue]=useState(false)

              

        const {Component} = props

        onAuthStateChanged(auth, (user) => {
            if (user) {

setTimeout(() => {
  setLoaderValue(true)
  
}, 3000);
              

            } else {

setTimeout(() => {
  
  setLoaderValue(true)
  
}, 3000);

            }
          });

        if(!loaderValue)
        
        return <Loader /> 


  return (

  <Component />
  )
}