import React from 'react'
import './Slider.scss'
import { useSelector } from 'react-redux'
import CardSlider from '../CardSlider/CardSlider'

const Slider = () => {
  const movies=useSelector((state)=>state.cinflex.movies)
  
  return (
   <div style={{overflow:'hidden'}}>
    {
      ["Trending Now","New Release","Blockbuster Movies","Popular here","Action packed","epics"].map((data,index)=>{
        return (
          <CardSlider title={data} data={movies.slice(index*10,(index+1)*10)} key={index}/>
        )
      })
    }
   </div>
  )
}

export default Slider