import React, { useState , useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { doc , setDoc , serverTimestamp} from 'firebase/firestore/lite'
import { AuthContext } from 'context/AuthContext';
import { firestore } from 'Config/firebase';
import { useNavigate } from 'react-router-dom';


const initialState =
{
title : '',
location : '',
description:'',

}


export default function Hero()

{

  // console.log(window.getRandomId())

  const {user} = useContext(AuthContext)

  const [state , setState] = useState(initialState)

  const [process , setProcess] = useState(false)

  const navigate = useNavigate()
  
  const handleChange = (e) =>
  {
    
    setState({...state, [e.target.name]:e.target.value})

  }

const handleSubmit = (e) =>
{

  e.preventDefault();

 console.log(state)

 console.log(user)
  
  const {title,location,description} = state


if (title.length < 3) {
   // alert('Please enter your title Correctly')

    return window.notify('Please enter your title Correctly' , 'warning')
  }
  if (location.length < 8) {

    return   window.notify('Please enter your location Correctly' , 'warning')
       
  }
  if (description.length < 12) {
             
    return  window.notify('Please enter your description Correctly' , 'warning')
    
  }
  
  const formData = {title,location,description}  
  
  formData.dateCreated = serverTimestamp()
  formData.id = window.getRandomId()
  formData.status = 'active'
  
  formData.createBy = {
    email:user.email,
    uid : user.uid
  }
  

createDocument(formData)

}

const createDocument = async(formData) =>

{ 
  setProcess(true)
  // console.log(formData)
try
{
  // Add a new document in collection "cities"
  await setDoc(doc(firestore, 'todos', formData.id),formData );
  
  window.notify('Todo has been Successfully Added' , 'success')
}

catch(error)
{

  // console.error(error)
window.notify('Something went wrong , todo is"nt Added' , 'error')

}
setProcess(false)

navigate('todos')

}

  return (
    <>
    
    <div className=" home d-flex justify-content-center align-items-center">
    <div className="container">
            <div className="row   ">
            <div className="col col-12    ">
                <div className="card rounded-3   p-2 p-md-5   " >
                <h1 className="text-center ">Add Todo </h1>
          
           
            <form onSubmit={handleSubmit} >
           <div className="row mt-3 ">
            <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1">
        <input type="text" name='title' className="form-control   " placeholder="Title" onChange={handleChange}  />
            </div>
            <div className="col col-12 col-md-6  p-1 ">
            <input type="text" name='location' className="form-control  " placeholder="Location" onChange={handleChange}  />
            </div>
        </div>
        <div className="row mt-3">
              <div className="col">
                <textarea name='description' className="form-control"  placeholder="Description"onChange={handleChange} ></textarea>
              </div>
              </div>
             
              <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-5"  >
                    <div className="d-grid gap-2">
                    <button className='btn btn-danger' disabled={process}>{
                      !process ? "Add todo" :  <div className='spinner-border spinner-border-sm'></div>
                    }</button>
                      </div>
                </div>
            </div>
              </form>
          
            </div> 
        </div> 
    </div>
    </div>
    </div>
    
    </>
  )
}
