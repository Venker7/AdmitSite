import React, { useState } from "react";

export const TotalBooks = () => {
    const [total,setTotal]=useState(0)
  return <div className="card"><p>Total Books</p>{total}</div>;
};
