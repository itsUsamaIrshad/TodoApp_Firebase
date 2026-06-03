
import React from 'react'
import { Link } from 'react-router-dom'
import 'react-phone-number-input/style.css'
 import PhoneInput from 'react-phone-number-input'
import { useState , useContext } from 'react'
import { AuthContext } from 'context/AuthContext'
 



export default function Phnumber() {


const [number , setNumber] = useState('')
const [error , setError] = useState('')

const {SetCaptcha} = useContext(AuthContext)

const getOTP = async(e)=>
{

e.preventDefault()

setError('')
 
if(number=== '' || number===undefined)
return setError('Please enter a valid number')
console.log(number)

try{
  const response = await SetCaptcha(number)
  console.log(response)
}
catch(error)
{

  console.log('error')

}

console.log(number)

}


  return (



    <div className='backColor'>
    <div className="container">
      <div className="row">
        <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
          <div className="card p-2 p-md-3 p-lg-4">
            <div className="row">
              <div className="col py-3 ">
            <h1>OTP</h1>
              </div>
            </div>

            <form  onSubmit={getOTP}>
          
            <div className="row mb-3 ">
              <div className="col col-12 ">
            <PhoneInput 
            type='tel'
            value={number}
            onChange={setNumber}
            placeHolder="Enter Phone Number"
            />
            <div className="recaptcha-container" />
              </div>
            </div>
            <div className="row  mb-3">
                <div className="col text-center mt-4">
                  <button className='btn btn-danger  w-100'>Cancel</button>
              
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col text-center mt-4">
                  <button className='btn btn-info  w-100' type='submit' >Send otp</button>
              
                </div>
              </div>
            </form>
      <div>
     
        </div>
            <div className="row">
              <div className="col col-12 col-md-5 text-center text-md-0 ">
                <p className='mb-0' >Need an account <Link to='/authentication/register' className="   text-dark" >Register</Link> </p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}





