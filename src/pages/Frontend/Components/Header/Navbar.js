import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { Link } from 'react-router-dom'
import {auth} from 'Config/firebase'
import { signOut } from 'firebase/auth'

export default function Navbar() {

  const { isAuthentication , dispatch} = useContext(AuthContext)


const handleLogout = ()=>
{

  signOut(auth)

  .then(()=>
  {
    dispatch({type:'LOGOUT'})
    

    window.notify('Logout Successfully' , 'success')

  })
  
.catch = (error) => {
console.error(error)
}

}



  return (
    <header>
    <nav className= "navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link active" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to='about' className="nav-link active" >About</Link>
        </li>
        <li className="nav-item">
          <Link to='todos' className="nav-link active" >Todos</Link>
        </li>
        <li className="nav-item">
          <Link to='contact' className="nav-link active" >Contact</Link>
        </li>
      </ul>
      <div className="d-flex">
      {!isAuthentication
        ? <Link  to='Authentication/login' className='btn btn-primary btn-sm text-white'  type="submit">Login</Link>

        :<>
        <Link  to='Dashboard/homeDash' className='btn btn-danger btn-sm text-white me-2'  type="submit">Dashboard</Link>
        <button   className='btn btn-primary btn-sm text-white'  onClick={handleLogout}>Logout</button>
        </>
      
      }
      
      </div>
    
    </div>
  </div>
</nav>
</header>
  )
}
