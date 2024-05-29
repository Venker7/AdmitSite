import React, { useEffect, useState } from "react";
import { instance } from "../../../api";
import { CardSkeleton } from "./CardSkeleton";
import { useNavigate } from "react-router-dom";
export const TotalBooks = () => {
  const [totalbooks, setTotalBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`api/book/get`);
        setTotalBooks(response.data.book);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="card"
      onClick={() => {
        navigate("/checkbooks");
      }}
    >
      <p>Total Books</p>
      {isLoading ? <CardSkeleton /> : totalbooks.length}
    </div>
  );
};
