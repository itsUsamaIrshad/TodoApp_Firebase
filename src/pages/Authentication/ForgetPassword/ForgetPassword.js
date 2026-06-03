import React , { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth"
import { Link }from 'react-router-dom'
import { auth } from 'Config/firebase';


const initialState = {email:''} 


export default function ForgetPassword() 

{

  const [state , setState] = useState(initialState)

  const handleChange = (e)=>
  {
  setState(state =>({...state , [e.target.name]:e.target.value}))
  }


const handlePassword = (e)=>
{
  
  e.preventDefault()

   const { email } = state

  sendPasswordResetEmail(auth , email)

  .then(() => 
  {
    // Password reset email sent!
    console.log('password reset email sent')
    // ..
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.error(error)
    // ..
  });

}

  return (

    <div className='backColor'>
    <div className="container">
      <div className="row">
        <div className="col col-12 col-md-6 col-lg-4 offset-lg-4 offset-md-2 mb-5 col-md-8 col-12 py-5">
          <div className="card p-2 p-md-3 p-lg-4">
            <div className="row">
              <div className="col py-3 ">
            <h1 className='text-center'>Type your email to reset Password</h1>
              </div>
            </div>
            <form onSubmit={handlePassword}>
            <div className="row mb-3 ">
              <div className="col col-12 ">
                
            <input type="email" name="email" placeholder='Please Enter your Email' className='form-control' onChange={handleChange} />

              </div>
            </div>
            <div className="row  mb-3">
              <div className="col text-center mt-4">
                <button className='btn btn-danger  w-100' >Forgot Password</button>
              </div>
            </div>
            </form>
            <div className="col col-sm-9  col-10  col-md-12 text-center ">
                  <p className='mb-0' >Need an account <Link to='/authentication/login' className="text-dark" >Login</Link> </p>
              </div>
              </div>
            </div>
        </div>
        </div>
      </div>
        
  )
}
