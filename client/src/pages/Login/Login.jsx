import React, { useState } from "react";
import { Backgroundimage, Header } from "../../components";
import { firebaseAuth } from "../../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
const Login = () => {

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
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      alert(error)
    }
  };

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <div className="signin__container">
      <Backgroundimage />
      <div className="signin__content">
        <Header login={false} />
        <div className="signin__form">
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
              <button onClick={() => setShowPassword(true)}>Enter Password</button>
            )}
          </div>
          <button className="signin__login" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
