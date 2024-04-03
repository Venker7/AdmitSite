import React, { useState } from "react";
import "./SlidingForm.css"
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
export const SlidingForm = ({onRegister}) => {
  const [isLoginFormVisible, setIsLoginFormVisible]=useState(true)

  const registerVisible =()=>{
        setIsLoginFormVisible(false);
  }

  return <div className="slidingform">
    <div className={`form-wrapper ${isLoginFormVisible ? 'slide-left':'slide-right'}`}>
      {isLoginFormVisible?<LoginForm setRegister={registerVisible}/>:<RegistrationForm onRegister={onRegister}/>}
    </div>

  </div>;
};
