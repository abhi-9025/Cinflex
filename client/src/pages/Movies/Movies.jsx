import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, getMovies } from "../../store/cinflicSlice";
import { firebaseAuth } from "../../utils/firebase-config";
import "./Movies.scss";
import { Navbar, NotAvqailable, Selectgenre, Slider } from "../../components";
import { onAuthStateChanged } from "firebase/auth";
const Movies = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.cinflex.genresLoaded);
  const movies = useSelector((state) => state.cinflex.movies);

  const genres = useSelector((state) => state.cinflex.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(getMovies({ type: "movie" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if(currentUser) navigate("/")
  });
  return( <div className="text-white movies__Container">
    <div className="navbar">
    <Navbar isScrolled={isScrolled}/>
    </div>
    <Selectgenre genres={genres} type="movie"/>
<div className="data">
 {
    movies.length?<Slider movies={movies}/>:
    <NotAvqailable/>
 }
</div>
    </div>)
};

export default React.memo(Movies);
