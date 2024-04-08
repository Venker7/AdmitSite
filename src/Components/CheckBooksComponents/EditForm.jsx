import React, { useState } from "react";
import "./BookList.css";

// Custom hook to manage form state
const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    handleChange,
  };
};

export const EditForm = ({ book,onSuccess }) => {
  // Initialize form state with the initial values from the book object
  const { title: initialTitle, author: initialAuthor ,id:initialID } = book;
  const { formData, handleChange } = useForm({
    title: initialTitle,
    author: initialAuthor,
    id:initialID,
    department: "",
    total: "",
    available: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setTimeout(()=>{
        onSuccess()
    },2000)

  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <div className="editinput">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="editinput">
          <label htmlFor="name">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="editinput">
          <label htmlFor="name">BookID:</label>
          <input type="text" 
          name="id"
          value={formData.id}
          onChange={handleChange}/>
          </div>
        <div className="editinput">
          <label htmlFor="name">Department:</label>
          <select
            name="department"
            className="edit-department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department to Search</option>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Electronics Engineering">Electronics Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Basic Science">Basic Science</option>
            <option value="Humanity Science">Humanity Science</option>
            <option value="Management">Management</option>
          </select>
        </div>
        <div className="editinput">
          <label htmlFor="name">Total:</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
          />
        </div>
        <div className="editinput">
          <label htmlFor="name">No.of available:</label>
          <input
            type="number"
            name="available"
            value={formData.available}
            onChange={handleChange}
          />
        </div>
        <div className="editinput">
          <label htmlFor="name">Upload Image:</label>
          <input className="upload-image" type="file" />
        </div>
        <div className="button-update">
          <button className="update" type="submit">update</button>
        </div>
      </form>
    </div>
  );
};
