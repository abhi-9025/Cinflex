import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserLikedMovies,
} from "../../store/cinflicSlice";
import { firebaseAuth } from "../../utils/firebase-config";
import "./Liked.scss";
import { onAuthStateChanged } from "firebase/auth";
import { Card, Navbar } from "../../components";

const Liked = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.cinflex.movies);
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) dispatch(getUserLikedMovies(email));
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  return (
    <div className="text-white">
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>
          My list
          </h1>
          <div className="grid">
            {movies.map((movie, index) => {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  isLiked={true}
                />
              );
            })}
          </div>

      </div>
    </div>
  );
};

export default Liked;
