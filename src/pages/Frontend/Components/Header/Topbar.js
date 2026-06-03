import React,{useState,useEffect } from 'react'
import dayjs from 'dayjs';


export default function Topbar()

{
  
  const [currentDate , setCurrentDate] = useState('')
  
  useEffect(()=>
  {
  
    setInterval(() => {
      setCurrentDate(dayjs().format('dddd,MMMM D,YYYY,h:mm:ss A'))
  
    }, 1000);
  
  },[])
  
  return (
    <header className='bg-primary'>
<div className="container">
  <div className="row">
    <div className="col">
      <p className='mb-0 text-center text-white'>{currentDate}</p>
    </div>
  </div>
</div>


    </header>
  )
}
