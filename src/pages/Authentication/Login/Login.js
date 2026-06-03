import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from 'Config/firebase';
import { useNavigate } from 'react-router-dom';
import {  signInWithPopup, GoogleAuthProvider , FacebookAuthProvider, signOut  } from "firebase/auth";
import {GoogleLoginButton , FacebookLoginButton  } from 'react-social-login-buttons'
import { AuthContext } from '../../../context/AuthContext';


const initialState = {email:'', password : ''}


export default function Login() {
  
const {dispatch} = useContext(AuthContext)

  const navigate = useNavigate() //////// navigate kisi function kai andr nhi rkty
  
  const [state , setState] = useState(initialState)
 const [process , setprocess] = useState(false)
 
 


const handleChange = (e)=>
{
setState(state =>({...state , [e.target.name]:e.target.value}))
}

 /////////////

const handleGoogleSignIn = async() =>
{
  try {
    const provider = new GoogleAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
    console.error(error)
    
  }

}
//////////
const handleFacebookSignIn = async() =>
{
  try {
    const provider = new FacebookAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
    console.error(error)
    
  }

}


const handleLogin = (e)=>
{

 e.preventDefault()

  const {email , password} = state

  if(!email)

  {
    window.notify('Please Enter your Email' , 'error')
    return;
  }

  if(!password)
  {
    window.notify('Please Enter your Password' , 'error')
    return;
  }
  

setprocess(true)

signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {

    dispatch({type:'LOGOUT'})

    const user = userCredential.user;


    if(user.emailVerified)
    {
      dispatch({type:'LOGIN' , payload:{user} })
      navigate('/')
    window.notify("Login Successfully", "success")
    }

    else
    {
      signOut(auth).then(() =>
     {
      window.notify("please verify your email", "error")
      console.log("signout bcz email not verified")
    }).catch((error) => {
      // An error happened.
      console.error(error)
      
    });
    }

    
  })

  .catch((error) => {
    
    console.log('there is no email record , please register your email')

  })
 

setprocess(false)

}



  return (
    <div className='backColor'>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
            <div className="card p-2 p-md-3 p-lg-4">
              <div className="row">
                <div className="col py-3 ">
              <h1>Login</h1>
                </div>
              </div>

              <form onSubmit={handleLogin}>
             
              <div className="row mb-3 ">
                <div className="col col-12 ">
                  <label htmlFor="Email">Email</label>
           <input type="email" name="email" placeholder='Email' className='form-control'onChange={handleChange} />

                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col col-12 ">
                  <label htmlFor="Password">Password</label>
              <input type="password" name="password" placeholder='Password' className='form-control' onChange={handleChange} />

                </div>
              </div>

              
              <div className="row  mb-3">
                <div className="col  text-center mt-4">
                  <button className=' text-white btn btn-danger  w-100' disabled={process} >
                    {!process
                  ? 'Login'
                 :<div className="spinner-border text-white spinner-border-sm" role="status"></div>
                }

                </button>
                </div>
              </div>

              </form>
        <div>
        <div className="row">
          <div className="col col-12 col-md-6">
          <div className=' m-auto py-2 ' >
            <GoogleLoginButton onClick={handleGoogleSignIn} />
            </div>
          </div>
          <div className="col col-12 col-md-6">
          <div className=' m-auto py-2 ' >
          <FacebookLoginButton onClick={handleFacebookSignIn} />
            </div>
          </div>
        </div>
          </div>
              <div className="row">
                <div className="col col-12 col-md-5 text-center text-md-0 ">
                  <p className='mb-0' >Need an account <Link to='/Authentication/register' className="   text-dark" >Register</Link> </p>
                </div>
          
          
                <div className="col col-sm-9  col-10   col-md-7 text-end ">
                  <p className='mb-0 ' >Need an account <Link to='/Authentication/forgetPassword' className="   text-dark" >Forget Password</Link> </p>
              </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
  )
}
