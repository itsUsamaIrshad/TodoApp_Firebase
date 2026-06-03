import React from 'react'

export default function Footer() {

const year = new Date().getFullYear()


  return (
    <footer className='py-2 bg-dark'>
      <div className="container">

      <div className="row">
        <div className="col">
          <p className='text-white text-center mb-0'>&copy;{year} :All Right Reserved</p>
        </div>
      </div>

      </div>

    
    </footer>
  )
}
