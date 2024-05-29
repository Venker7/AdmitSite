import React from "react";
import "./LoginForm.css";
import {useForm} from 'react-hook-form'

export const LoginForm = ({ setRegister,onlogin }) => {

  const form = useForm();
  const {register,handleSubmit,formState}=form;
  const {errors}=formState;
  const onLogin = (data) => {
    onlogin()
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
      <form className="form" onSubmit={handleSubmit(onLogin)} noValidate>
      <label htmlFor="email">Email</label>
        <input
          type="text"
          className={`input ${errors.email ? 'input-error' : ''}`}
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._]+@mtu\.ac\.in$/,
              message: 'Invalid email'
            },
            required: "Valid Email is required"
          })}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className={`input ${errors.password ? 'input-error' : ''}`}
          {...register("password", { required: "Password is required" })}
        />
        <p>{errors.password?.message}</p>
        <div className="button">
          <button className="button-login">Login</button> 
        </div>
      </form>
      <div className="register">
        <p>Is this your first time logging in?</p>
        <div className="register-link" onClick={gotoRegister}>Register</div>
      </div>
    </div>
  );
};
