import React, { useState, useEffect, useRef } from "react";
import "./OTPVerification.css";
import img from './Components/Manipur_Technical_University_logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OTPVerification = ({ onVerify }) => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [isResending, setIsResending] = useState(true);
  const [otp, setOTP] = useState(["", "", "", ""]);

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

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleResend = () => {
    setIsResending(true);
    console.log("Resending OTP...");
    toast('OTP has been resent to your MTU email', { autoClose: 10000, position: "top-left" });
  };

  const verify = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 4) {
      toast.error('Please enter a 4-digit OTP');
    } else {
      toast('OTP has verified', { autoClose: 5000 });
      setTimeout(() => {
        onVerify();
      }, 5000);
    }
  };

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Automatically focus on the next input field if the current one is filled
      if (value.length === 1 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

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
        {otp.map((value, index) => (
          <div key={index} className="input">
            <input
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={inputRefs[index]} // Ref assigned to the input field
            />
          </div>
        ))}
      </div>

      <div className="resend">
        <div id="resend-otp" onClick={handleResend}>Resend OTP</div>
        <div className="otp-time">00:{countdown !== 0 && `${countdown}s`}</div>
      </div>

      <button className="otp-verify" onClick={verify}>
        <p id="verify">Verify OTP</p>
      </button>
      <ToastContainer />
    </div>
  );
};
