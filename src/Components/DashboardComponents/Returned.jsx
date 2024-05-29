import React, { useState, useEffect } from "react";
import { instance } from "../../../api.js";
export const Returned = ({ openmodal }) => {
  const [Return, setReturn] = useState(0);
  const returnpop = () => {
    openmodal();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`api/loan`);
        const data = response.data.loans.filter(
          (book) => book.remark === "Submitted"
        );
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
