import React, { useEffect, useRef, useState } from "react";
import "./AddBooks.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { instance } from "../../api";
import LoadingBar from "react-top-loading-bar";
export const AddBooks = () => {
  const ref= useRef(null)
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [branchIds, setBranchIds] = useState();

  useEffect(() => {
    fetchbranches();
  }, []);

  const fetchbranches = async () => {
    try {
      const response = await instance.get("api/branch");
      setBranchIds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = (data) => {
    const formData = new FormData();
    formData.append("title", data.bookname);
    formData.append("author", data.author);
    formData.append("branch", data.department);
    formData.append("copiesOwned", data.number);
    formData.append("publishDate", data.publishDate);
    formData.append("file", data.image[0]);

    addBookapi(formData);
    }

  const addBookapi = async (formData) => {
    try {
      ref.current.continuousStart()
      if (!formData || !formData.has) {
        console.log("formData is empty");
        return; // Exit the function early if formData is empty
      }

      const response = await instance.post(
      "api/book/add",
        formData
      )
      ref.current.complete()
      if (response.data.success) 
        {
          await Swal.fire({
            icon: "success",
            title: "Added Successfully",
            showConfirmButton: false,
            iconColor: "green",
            timer: 3000,
          });
          window.location.reload()
        }
        else{
          Swal.fire({
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            iconColor: "red",
            timer: 3000,
          });
        }
  } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        iconColor: "red",
        timer: 2000,
      });
    }
  };
  return (
    <div className="addbooks">
      <LoadingBar color='#0088ff' ref={ref} />
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
