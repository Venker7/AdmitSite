import React, { useState, useEffect } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants.js";
export const Borrowed = () => {
  const [borrow, setBorrow] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/loan`);
        console.log(response);
        const data = response.data.loans.filter(
          (book) => book.remark === "Unsubmitted"
        );
        // setBooks(response.data.loans);
        console.log(data);
        setBorrow(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="card"
      onClick={() => {
        navigate("/issuedbooks");
      }}
    >
      <p>Borrowed Books</p>
      {borrow}
    </div>
  );
};
