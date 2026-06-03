import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification, signOut} from 'firebase/auth'
import { doc , setDoc } from 'firebase/firestore/lite';
import {auth , firestore } from 'Config/firebase'
import { AuthContext } from 'context/AuthContext';
import { getDownloadURL, ref ,  uploadBytesResumable } from "firebase/storage";
import {storage} from 'Config/firebase';



const initialState = {firstName:'',lastName:'', email:'', password : '', gender:'',number:'',img:''}



export default function Register() {

const {dispatch}= useContext(AuthContext)
 const [state , setState] = useState(initialState)
 const [process , setprocess] = useState(false)
 const [progress , setProgress] = useState(0)
 const [file , setFile] = useState({})


 const [downloadURL,setDownloadURL]= useState('')

 const navigate = useNavigate()




const handleChange = (e)=>
{

setState(state =>({...state , [e.target.name]:e.target.value}))

}



const handleRegister = async(e)=>
{
e.preventDefault()



const {email , password , firstName , lastName , gender , number, img} = state

if(!firstName)
{
  window.notify('Please Enter your FirstName', 'error')
  return;
}
if(firstName.length<3)
{
  window.notify('FirstName lenght AtLeast 3 character', 'error')
  return;
}
if(!lastName)
{
  window.notify('Please Enter your LastName' , 'error')
  return;
}
if(lastName.length<3)
{
  window.notify('LastName lenght AtLeast 3 character', 'error')
  return;
}
if(!number)
{
  window.notify('Please Enter your Number' , 'error')
  return;
}

if(!gender)
{
  window.notify('choose your Gender' , 'error')
  return;
}
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
if(password.length<8)
{
  window.notify('Password lenght AtLeast 8 character', 'error')
  return;
}
if(!file?.size)
{
  window.notify('File not found', 'error')
  return
}




setprocess(true)

createUserWithEmailAndPassword(auth, email, password)

.then((userCredential) => 
{
  //  dispatch({type : 'LOGOUT'})

  
  window.notify('Please wait untill the process is complete' , 'info')
  
  sendEmailVerification(auth.currentUser)

    .then(() => {
      console.log("send email")
      return
    });
    
  let user = userCredential.user;

  AddDoc(user)
  handleUpload()
  
})

  .catch((error) =>
   {
 console.error(error)
 window.notify('You already Register ' , 'error')
      })
    
  
}

const AddDoc =async(user)=>
{
  const {email , password , firstName , lastName , gender , number , img} = state
  try
  {
    await setDoc(doc(firestore, "User", user.uid ), {  
      firstName,
      lastName,
      email,
      password,
      gender,
      img,
      number,
      uid:user.uid,
      
    });
    console.log(user.uid)
  
  }

  catch(error)
  {
    console.error(error)
  }
}

  
 const handleUpload = ()=>
{
 
  const fileExt = file.name.split('.').pop();
 
 const randomId = Math.random().toString(36).slice(2)
 
 const imageRef = ref(storage,`image/${randomId}.${fileExt}}`)

 const uploadTask = uploadBytesResumable(imageRef, file);

  setDownloadURL('')
 
uploadTask.on('state_changed',
(snapshot) => {
  

  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) 
  
  setProgress(progress)

    // if(progress==100)
    //  {
      
    //    setTimeout(() => {
        
    //      setprocess(false)
    //      navigate('/authentication/login')

    //      window.notify('User Register SuccessFully', 'success')
    //     }, 2000);
        
    //     setTimeout(() => {
    //       window.notify('Email verification sent , verify it ', 'success')
    //     }, 5000);
       
    //   } 
     
      
      
      
    },
    // (error)=>  ///// callBack function
    // {
    //   console.error(error)
      
    // },
    
    // () => {
      

    //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     setDownloadURL(downloadURL)
  
    //   });
    // }
     


)
 }

const  showPass = () =>
 {
  let x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


  return (

<>   
    <main className='bg-info'>
    <div className="container">
      <div className="row">
        <div className="col col-12  offset-md-1 mb-5 col-md-10 ">
          <div className="card p-5 mt-4  ">
            <div className="row">
              <div className="col py-3 ">
            <h1>Register</h1>
              </div>
            </div>

            <form onSubmit={handleRegister}>
            <div className="row ">
              <div className="col col-12 col-lg-6 mb-3 ">
                <label htmlFor="text">First Name*</label>
            <input type="text" name="firstName" placeholder='Enter your firstName' className='form-control' onChange={handleChange} />

              </div>
              <div className="col col-12 col-lg-6 mb-3">
                <label htmlFor="text">Last Name*</label>
            <input type="text" name="lastName" placeholder='Enter your lastName' className='form-control' onChange={handleChange} />
              </div>
            </div>
      
          
            <div className="row mb-3 ">
              <div className="col col-12 col-lg-6 mb-3 ">
                <label htmlFor="Email">Email*</label>
            <input type="email" name="email" placeholder='Email' className='form-control'onChange={handleChange} />

              </div>
              <div className="col col-12 col-lg-6 ">
                <label htmlFor="Password">Password*</label>
            <input type="password" name="password"  placeholder='Password' id="myInput" className='form-control' onChange={handleChange} />
          
            <input type="checkbox" onClick={showPass}  />Show Password
            </div>
              </div>
              <div className="row">
              <div className="col col-12">
                <label htmlFor="phoneNumber">Enter Phone Number*</label>
            <input type="tel" name="number" placeholder='Number' className='form-control' onChange={handleChange} />
           
           
               </div>
              </div>
          
            
            <div className="row">
              <div className="col col-12 mb-3">
              <label htmlFor="Upload" className='mt-3' >Upload Photo *</label>
              <input type="file" className='form-control mt-2 '   onChange= {e=>{setFile(e.target.files[0])}} />
              </div>
              {process
       ? <div className="row">
    <div className="col ">
    <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger"  role="progressbar" style={{width:`${progress}%`}} aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
    </div>
  </div>
:<div className="row">
<div className="col ">
<div className="progress">
<div className="progress-bar progress-bar-striped bg-danger "  role="progressbar" style={{width:`${progress}%`}} aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100%">{progress}</div>
</div>
</div>
</div>
    }
            </div>
            {downloadURL && <p className='mb-0'>URL : {downloadURL} </p>}
            <div className="row" >
              <div className="col col-12 ">
                <label htmlFor="Gender">Gender: *</label>
              </div>
            </div>
            <div className="row" >
              <div className="col col-12 ">
              <label htmlFor="Gender">Male</label>
              <input type="radio" className='ms-1' value='male' name='gender' onChange={handleChange} />
              <label htmlFor="Gender" className='ms-1'>Female</label>
              <input type="radio" className='ms-1' value='female' name='gender' onChange={handleChange} />              </div>
            
            </div>
            <div className="row ">
              <div className="col text-center mt-4  ">
                <button className='btn btn-danger w-75' disabled={process} >
                  {!process
                ? 'Register'
               :<div className="spinner-border text-white spinner-border-sm "  role="status"></div>
              }
              </button>
              </div>
              
            </div>
            </form>
            <div className="row mt-3">
              <div className="col">
                <p className=' text-center' >Already have an account <Link to='/Authentication/login' className="  text-dark" >Login</Link> </p>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main> 
      </>
  )
}
