import React from "react";
import "./AddBooks.css"
import {useForm} from "react-hook-form"
export const AddBooks = () => {
  const form = useForm();
  const {register,handleSubmit,formState}=form;
  const {errors}=formState;
  const onAdd=(data)=>{
   console.log(data)
  }
  return <div className="addbooks">
    <form className="addbooks-form" onSubmit={handleSubmit(onAdd)}>
     <h3>Add Books</h3>
     <div className="field">
      <div className="book-name"><label htmlFor="book_name">BookName:</label>
      <input type="text" {...register("bookname",{required:"Bookname is required"})}/></div>
      <p>{errors.bookname?.message}</p>
      <div className="book-id"><label htmlFor="book_ID">Book ID:</label>
      <input type="text" {...register("bookID",{required:"BookID is required"})}/></div>
      <p>{errors.bookID?.message}</p>
       <div className="author"><label htmlFor="author">Author:</label>
      <input type="text" {...register("author",{required:"Author of the book is required"})}/></div> 
      <p>{errors.author?.message}</p>
      <div className="department"><label htmlFor="department">Department:</label>
      <select {...register("department", { required: "Department is required" })}>
          <option value="">Select the department</option>
          <option value="computer">Computer Science and Engineering</option>
          <option value="electrical">Electrical Engineering</option>
          <option value="electronics">Electronics Engineering</option>
          <option value="civil">Civil Engineering</option>
          <option value="mechanical">Mechanical Engineering</option>
          <option value="basic-science">Basic Science</option>
          <option value="humanity-science">Humanity Science</option>
          <option value="management">Management</option>
      </select>
      </div>
      <p>{errors.department?.message}</p>
      <div className="number"><label htmlFor="number">No.of Books:</label>
      <input type="number" {...register("number",{required:"Number of Books is required"})}/></div>
      <p>{errors.number?.message}</p>
      <div className="button"><button>Add</button></div>
     </div>
    </form>
  </div>;
};
