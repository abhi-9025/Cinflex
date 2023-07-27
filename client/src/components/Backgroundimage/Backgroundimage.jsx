import React from 'react'
import loginImage from  '../../assets/login.jpg'
import './Backgroundimage.scss'

const Backgroundimage = () => {
  return (
    <div className='backgroudimage__header' >
      <img src={loginImage} alt='background' />
    </div>
  )
}

export default Backgroundimage