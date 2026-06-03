import { onAuthStateChanged } from 'firebase/auth'
import React ,{ createContext ,useEffect, useReducer} from 'react'
import {auth} from '../Config/firebase'
// import { RecaptchaVerifier } from 'firebase/auth'


export const AuthContext = createContext()

const initialState = {isAuthentication : false }

const reducer = ((state , action)=>
{

// console.log(state)
// console.log(action)

switch (action.type) {
        case 'LOGIN':
          // user : action.payload.user
        return {isAuthentication : true , user : action.payload.user}        
         
        case 'LOGOUT':
          
          return {isAthentication:false}
        
          default:
            return state                
          }
          
          
          
          
          

})

export default function AuthContextProvider(props)



{

  const [state , dispatch] = useReducer(reducer , initialState)
  
  
 
  
useEffect(()=>
{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
  
      // window.notify('User is Signed in', 'success')

// console.log(user)

console.log('User is signed in')

      dispatch({type : 'LOGIN', payload:{user} })
      // ...
    } else {
      console.log(' User is signed out ')
      // ...
      // window.notify("User is Signed out", 'warning')
    }
  });
  
  
},[])

return (
  
  <AuthContext.Provider value={{...state , dispatch  }}>
        {props.children}
</AuthContext.Provider>
  )
  
}


