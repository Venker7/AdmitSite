import React, { useState, useEffect } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../api.js";
export const Borrowed = () => {
  const [borrow, setBorrow] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/loan')
        const data = response.data.loans.filter(
          (book) => book.remark === "Unsubmitted"
        );
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
