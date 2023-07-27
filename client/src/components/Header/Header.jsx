import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom"
import './Header.scss'
const Header = (props) => {

  const navigate=useNavigate()
  return (
    <div className="header__logo">
      <img src={logo} alt='logo'/>
      <button onClick={()=>navigate(props.login?"/login":'/signup')}>{props.login?"Login":"Signup"}</button>
    </div>
  )
}

export default Header