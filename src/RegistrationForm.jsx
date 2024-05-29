import React from "react";
import "./Registration.css";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrationForm = ({ onRegister }) => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    setTimeout(() => {
      onRegister();
    }, 3000);
    toast('OTP has been sent to your email ID', { autoClose: 3000 });
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form className="form-register" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className={`input ${errors.username ? 'input-error' : ''}`}
          {...register("username", { required: "Username is required" })}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="registration_no.">Registration No.</label>
        <input
          type="text"
          className={`input ${errors.registration_number ? 'input-error' : ''}`}
          {...register("registration_number", {
            pattern: {
              value: /^[0-9]{4}[A-Z]{2}[0-9]{4}$/,
              message: 'Please enter valid registration no.'
            },
            required: "Registration number is required"
          })}
        />
        <p>{errors.registration_number?.message}</p>
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

        <div className="button-div">
          <button type="submit" className="button">Register</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
