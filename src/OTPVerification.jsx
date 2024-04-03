import React, { useState, useEffect } from "react";
import "./OTPVerification.css";
import img from './Components/Manipur_Technical_University_logo.png'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const OTPVerification = ({onVerify}) => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [isResending, setIsResending] = useState(true);

  useEffect(() => {
    let timer;
    if (isResending) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
            setIsResending(false);
            return 60; 
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResending]);

  const handleResend = () => {
    setIsResending(true);
    console.log("Resending OTP...");
    toast('OTP has been resend to your MTU email',{autoClose:10000,position:"top-left"})
  };

  const verify =()=>{
    onVerify();
  }

  return (
    <div className="otp-container">
      <div className="otp-intro">
        <div className="logo">
            <img src={img} alt="" />
        </div>
        <h6>OTP Verification</h6>
        <p>We will send you a one-time password on your MTU email</p>
      </div>
      <div className="otp-inputs">
        <div className="input"><input type="text" maxLength={1}/></div>
        <div className="input"><input type="text" maxLength={1}/></div>
        <div className="input"><input type="text" maxLength={1}/></div>
        <div className="input"><input type="text" maxLength={1}/></div>

      </div>

      <div className="resend">
        <div id="resend-otp" onClick={handleResend}>Resend OTP</div><div className="otp-time">00:{countdown !== 0 && `${countdown}s`}</div>
      </div>

      <button className="otp-verify" onClick={verify}><p id="verify">Verify OTP</p></button>
      <ToastContainer/>
    </div>
  );
};
