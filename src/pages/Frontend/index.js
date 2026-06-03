import React from 'react'
import {Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header'
import Home from './Home';
import About from './About'
import Contact from './Contact/Contact';
import Todos from './Todos/Todos';


export default function index() {

  

return (

   <>

<Header/>
<main>

    <Routes>

<Route path='/'>
  
  <Route index element={<Home  />}/>
  <Route path='about' element={<About />}/>
  <Route path='todos' element={<Todos />}/>
  <Route path='contact' element={<Contact />}/>
    </Route>

    </Routes>

    </main>

<Footer/>

  
   </>


    
    

  )
}
