import React from 'react'
import { useDispatch } from 'react-redux'
import { getDataByGenre } from '../../store/cinflicSlice'
import './Selectgenre.scss'
const Selectgenre = ({genres,type}) => {
  const dispatch=  useDispatch()
  return (
        <select className='selectgnere__container' onChange={(e)=>dispatch(getDataByGenre({genre:e.target.value,type}))}>
        {
            genres.map((genre)=>{
                return (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                )
            })
        }
        </select>
  )
}

export default Selectgenre