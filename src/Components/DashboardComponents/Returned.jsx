import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.js";
export const Returned = ({ openmodal }) => {
  const [Return, setReturn] = useState(0);
  const returnpop = () => {
    openmodal();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/loan`);
        console.log(response);
        const data = response.data.loans.filter(
          (book) => book.remark === "Submitted"
        );
        // setBooks(response.data.loans);
        console.log(data);
        setReturn(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card" onClick={returnpop}>
      <p>Returned Books</p>
      {Return}
    </div>
  );
};
