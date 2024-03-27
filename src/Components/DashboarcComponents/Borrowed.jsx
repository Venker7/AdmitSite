import React, { useState } from "react";
import"./card.css"
export const Borrowed = () => {
    const [borrow,setBorrow]=useState(0)
  return <div className="card"><p>Borrowed Books</p>{borrow}</div>;
};
