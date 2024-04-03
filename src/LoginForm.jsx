import React from "react";
import "./LoginForm.css";

export const LoginForm = ({ setRegister }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior of form submission
    console.log('form has submit');
  };

  const gotoRegister = () => {
    setTimeout(() => {
      setRegister();
    }, 1000);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <p>Let's Go To Our Books World</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" pattern="[a-z0-9_]+@mtu\.ac\.in" title="please enter a valid MTU email address" />
        
        <label>Registration No.</label>
        <input type="text" pattern="[0-9]{4}[A-Z]{2}[0-9]{4}" title="Please enter a valid registration number"/>
        <div className="button">
          <button className="button-login">Login</button> {/* Specify type="submit" for login button */}
        </div>
      </form>
      <div className="register">
        <p>Is this your first time logging in?</p>
        <div className="register-link" onClick={gotoRegister}>Register</div>
      </div>
    </div>
  );
};
