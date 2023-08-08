import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, getMovies, getUserLikedMovies } from "../../store/cinflicSlice";
import { firebaseAuth } from "../../utils/firebase-config";
import "./Liked.scss";
import { onAuthStateChanged } from "firebase/auth";
import { Card, Navbar } from "../../components";

const Liked = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state) => state.cinflex.genresLoaded);
    const movies = useSelector((state) => state.cinflex.movies);
      const [email,setEmail]=useState(undefined)
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) setEmail(currentUser.email)
    else navigate('/login')
  })
  
    const dispatch = useDispatch();
  
    useEffect(() => {
        if(email)
         dispatch(getUserLikedMovies(email))
    }, []);
  
    useEffect(() => {
      if (genresLoaded) dispatch(getMovies({ type: "movie" }));
    }, [genresLoaded]);
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  return (
    <div className='text-white'>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>
                My list 
                <div className="grid">
                    {
                        movies.map((movie,index)=>{
                            return (
                                <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
                            )
                        })
                    }
                </div>
            </h1>
        </div>
    </div>
  )
}

export default Liked
