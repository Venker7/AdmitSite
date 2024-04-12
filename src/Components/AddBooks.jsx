import React, { useState } from "react";
import "./AddBooks.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"
export const AddBooks = () => {
 
  
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onAdd = (data) => {
    console.log(data);
    setTimeout(()=>{
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        iconColor:'green',
        timer:3000
      }) 
    },2000)
    setTimeout(()=>{
      window.location.reload();
    },3000)
  };

  return (
    <div className="addbooks">
      <form className="addbooks-form" onSubmit={handleSubmit(onAdd)}>
        <h3>Add Books</h3>
        <div className="field">
          <div className="book-name">
            <label htmlFor="book_name">BookName:</label>
            <input type="text" {...register("bookname", { required: "Bookname is required" })} />
          </div>
          <p>{errors.bookname?.message}</p>
          <div className="book-id">
            <label htmlFor="book_ID">Book ID:</label>
            <input type="text" {...register("bookID", { required: "BookID is required" })} />
          </div>
          <p>{errors.bookID?.message}</p>
          <div className="author">
            <label htmlFor="author">Author:</label>
            <input type="text" {...register("author", { required: "Author of the book is required" })} />
          </div>
          <p>{errors.author?.message}</p>
          <div className="department">
            <label htmlFor="department">Department:</label>
            <select {...register("department", { required: "Department is required" })}>
              <option value="">Select the department</option>
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Electronics Engineering">Electronics Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Basic Science">Basic Science</option>
              <option value="Humanity Science">Humanity Science</option>
              <option value="Management ">Management</option>
            </select>
          </div>
          <p>{errors.department?.message}</p>
          <div className="number">
            <label htmlFor="number">No.of Books:</label>
            <input type="number" {...register("number", { required: "Number of Books is required" })} />
          </div>
          <p>{errors.number?.message}</p>
          <div className="image-upload">
            <label htmlFor="image">Upload Image:</label>
            <input type="file" accept="image/*" {...register("image",{required:"Image of the book is required"})} />
          </div>
          <p>{errors.image?.message}</p>
         
          <div className="button">
            <button>Add</button>
          </div>
        </div>
      </form>
      
    </div>
    
  );
};
