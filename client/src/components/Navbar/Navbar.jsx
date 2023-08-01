import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut} from "firebase/auth";
import {firebaseAuth} from '../../utils/firebase-config'

const Navbar = ({isScrolled}) => {

   const navigate=  useNavigate()
  const headerLink = [
    { name: "Home", link: "/" },
    { name: "Tv Shows", link: "/tvseries" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate("/login")
  })
  return (
    <div className={`navbar__container ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar__left-container">
        <img src={logo} alt="logo" />
        <div className="navbar__list-container">
          <ul className="navbar__list-unordered">
            {headerLink.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link className="text-gray" to={link}>
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="navbar__right-container">
        <input placeholder="Search" className="navbar__input" />
        <div className="navbar__search-bar">
          <FaSearch color="white" />
        </div>
        <button
        onClick={()=>signOut(firebaseAuth)}
          style={{
            background: "none",
            padding: 10,
            borderRadius: "50%",
            marginRight: 40,
          }}
        >
          <FaPowerOff color="red" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
