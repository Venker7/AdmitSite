import React, { useState,useEffect } from "react";
import { CardSkeleton } from "./CardSkeleton";
import { instance } from "../../../api";
export const OverDue = ({ openmodal }) => {
  const [overdue, SetOverdue] = useState(0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/loan')
        const data = response.data.loans.filter(
          (book) => book.remark === "Due Fine"
        );
        SetOverdue(data.length);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleOverduePop = () => {
    openmodal();
  };

  return (
    <div className="card" onClick={handleOverduePop}>
      <p>Overdue Books</p>
      {isLoading ? <CardSkeleton /> : overdue}
    </div>
  );
};
