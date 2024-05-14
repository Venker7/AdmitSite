import React, { useEffect, useState } from "react";
import "./AddBooks.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

export const AddBooks = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [branchIds, setBranchIds] = useState();

  useEffect(() => {
    fetchbranches();
  }, []);

  const fetchbranches = async () => {
    try {
      const response = await axios.get("https://library-mtu.vercel.app/api/branch");
      setBranchIds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = (data) => {
    console.log(data.bookname);
    const formData = new FormData();
    formData.append("title", data.bookname);
    formData.append("author", data.author);
    formData.append("branch", data.department);
    formData.append("copiesOwned", data.number);
    formData.append("publishDate", data.publishDate);
    formData.append("file", data.image[0]);

    addBookapi(formData);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        iconColor: "green",
        timer: 3000,
      });
    }, 2000);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const addBookapi = async (formData) => {
    try {
      console.log(formData);
      if (!formData || !formData.has) {
        console.log("formData is empty");
        return; // Exit the function early if formData is empty
      }

      // Log the data appended to formData
      for (const [key, value] of formData.entries()) {
        console.log(key,value);
      }
      const response = await axios.post("https://library-mtu.vercel.app/api/book/add", formData);
      console.log(response);
      // return response;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addbooks">
      <form className="addbooks-form" onSubmit={handleSubmit(onAdd)}>
        <h3>Add Books</h3>
        <div className="field">
          <div className="book-name">
            <label htmlFor="book_name">BookName:</label>
            <input
              type="text"
              {...register("bookname", { required: "Bookname is required" })}
            />
          </div>
          <p>{errors.bookname?.message}</p>

          <div className="author">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              {...register("author", {
                required: "Author of the book is required",
              })}
            />
          </div>
          <p>{errors.author?.message}</p>
          <div className="department">
            <label htmlFor="department">Department:</label>
            <select
              {...register("department", {
                required: "Department is required",
              })}
            >
              <option value="">Select the department</option>
              {branchIds?.map((branchId) => (
                <option key={branchId._id} value={branchId._id}>
                  {branchId.name}
                </option>
              ))}
            </select>
          </div>
          <p>{errors.department?.message}</p>
          <div className="number">
            <label htmlFor="number">No.of Books:</label>
            <input
              type="number"
              {...register("number", {
                required: "Number of Books is required",
              })}
            />
          </div>
          <div className="number">
            <label htmlFor="number">PublishDate:</label>
            <input
              type="number"
              {...register("publishDate", {
                required: "Number of Books is required",
              })}
            />
          </div>
          <p>{errors.number?.message}</p>
          <div className="image-upload">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image of the book is required",
              })}
            />
          </div>
          <p>{errors.image?.message}</p>

          <div className="button">
            <button type="button" onClick={handleSubmit(onAdd)}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};