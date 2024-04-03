import React, { useState } from "react";
import "./Authentication.css"
import { LoginForm } from "./LoginForm";
import { OTPVerification } from "./OTPVerification";
import { RegistrationForm } from "./RegistrationForm";
import { SlidingForm } from "./SlidingForm";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Authentication = ({onlogin}) => {
    const [IsOtpVerified,setOtpVerified]=useState(false);
    const showOtpForm =()=>{
        setOtpVerified(true)
    }
    const handleVerify=()=>{
     toast("OTP has verified");
     setOtpVerified(false);
    }
  return <div className="authentication">
    <div className="authentication-container">
            <div>
               {IsOtpVerified ?(<OTPVerification onVerify={handleVerify}/>):<SlidingForm onRegister={showOtpForm} onlogin={onlogin}/>}
              <ToastContainer/>
            </div>
    </div>
  </div>;
};
