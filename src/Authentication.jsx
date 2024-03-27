import React, { useState } from "react";
import "./Authentication.css"
import { LoginForm } from "./LoginForm";
import { OTPVerification } from "./OTPVerification";
import { RegistrationForm } from "./RegistrationForm";
import { SlidingForm } from "./SlidingForm";

export const Authentication = () => {
    const [IsOtpVerified,setOtpVerified]=useState(false);
    const showOtpForm =()=>{
        setOtpVerified(true)
    }
  return <div className="authentication">
    <div className="authentication-container">
            <div>
               {IsOtpVerified ?(<OTPVerification/>):<SlidingForm onRegister={showOtpForm}/>}
              
            </div>
    </div>
  </div>;
};
