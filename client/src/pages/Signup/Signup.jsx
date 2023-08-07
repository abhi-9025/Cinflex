import React, { useState } from "react";
import { Backgroundimage, Header } from "../../components";
import { firebaseAuth } from "../../utils/firebase-config";
import { createUserWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
const Signup = () => {

  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignIn = async () => {
    try {
      const { email, password } = formData;
      if(email.length===0)
        throw "Email is Empty"
        if(password.length===0)
        throw "Password is Empty"
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      alert(error)
    }
  };

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <div className="signup__container">
      <Backgroundimage />
      <div className="signup__content">
        <Header login={true} />
        <div className="signup__form">
          <div>
            <h1 className="text-white">Unlimited movies, TV shows and more</h1>
            <h4 className="text-white">Watch anywhere. Cancel anytime.</h4>
            <h6 className="text-white">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div class="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
             <button className="signup__login" onClick={handleSignIn}>
            Sign up
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default React.memo(Signup);
