import React, { useState, useEffect } from "react";
import "./OTPVerification.css";

export const OTPVerification = () => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer;
    if (isResending) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
            setIsResending(false);
            return 60; // Reset countdown to 60 seconds when it reaches 0
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResending]);

  const handleResend = () => {
    setIsResending(true);
    // Simulate sending OTP (Replace with your actual logic)
    console.log("Resending OTP...");
  };

  return (
    <div className="otp-container">
      <div className="otp-intro">
        <h6>OTP Verification</h6>
        <p>We will send you a one-time password on your MTU email</p>
      </div>
      <div className="otp-inputs">
        <input type="text" maxLength={1}/>
        <input type="text" maxLength={1} />
        <input type="text"  maxLength={1}/>
        <input type="text"  maxLength={1}/>
      </div>
      <div className="resend" onClick={handleResend}>
        Resend OTP 00:{countdown !== 0 && `${countdown}s`}
      </div>
      <button className="otp-verify"><p id="verify">Verify</p></button>
    </div>
  );
};
