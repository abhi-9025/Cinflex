import React, { useState } from 'react'
import { Navbar } from '../../components'
import backgroundImage from "../../assets/home.jpg"
import MovieLogo from "../../assets/homeTitle.webp"
import {FaPlay} from "react-icons/fa"
import {AiOutlineInfoCircle} from "react-icons/ai"
import './Cinflex.scss'


const Cinflex = () => {

  const [isScrolled,setIsScrolled]=useState(false)

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0?false:true);
    return ()=>(window.onscroll=null);
  }
  return (
    <div>
      <Navbar/>
      <div className="Cinflex__hero">
        <img
         src={backgroundImage}
         alt='background'
         className='background-image'
        />
        <div className='Cinflex__container'>
            <div className="logo">
              <img src={MovieLogo} alt='Movie Logo'/>
            </div>
            <div className='cinflex__buttons'>
            <div className='play'>
               <button><FaPlay size={18}/>  Play</button>
            </div>
            <div className='more_info'>
               <button><AiOutlineInfoCircle size={18}/>  MoreInfo</button>
            </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Cinflex