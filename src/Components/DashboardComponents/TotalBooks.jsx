import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardSkeleton } from "./CardSkeleton";
import { useNavigate } from "react-router-dom";

export const TotalBooks = () => {
  const [totalbooks, setTotalBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://library-mtu.vercel.app/api/book/get"
        );
        console.log(response);
        setTotalBooks(response.data.book);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
