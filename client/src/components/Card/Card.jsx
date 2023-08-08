import React, { useState } from "react";
import "./Card.scss";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../../store/cinflicSlice";
const Card = ({ index,movieData,isLiked=false }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [isHovered, setIsHovered] = useState(false);
  const [email,setEmail]=useState(undefined)
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) setEmail(currentUser.email)
    else navigate('/login')
  })

  const addToList=async()=>{
    try {
      await axios.post("http://localhost:8000/api/user/add",{email,data:movieData})
    } catch (error) {
       console.error(error)
    }
  }
  return (
    <div
    className="card__container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered == false ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
          alt="movie image"
          loading="lazy"
          className="unhovered_img"
        />
      ) : (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie image"
              onClick={() => navigate("/player")}
            />
            <video
              src=""
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container">
            <h3 className="name text-white" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons">
              <div className="controls">
                <IoPlayCircleSharp
                  title="play"
                  color="white"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" color="white" />
                <RiThumbDownFill title="DisLike" color="white" />
                {isLiked ? (
                  <BsCheck title="Remove from List" color="white" onClick={()=>dispatch(removeFromLikedMovies({movieId:movieData.id,email}))} />
                ) : (
                  <AiOutlinePlus title="Add to My List" onClick={addToList}  color="white"/>
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info"  />
              </div>
            </div>
            <div className="genres">
              <ul style={{display:'flex' ,flexDirection:'row',listStyle:'none'}}>
                {movieData.genres.map((genre) => (
                  <li key={genre} className="text-white" style={{marginRight:'1rem'}}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default React.memo(Card);
