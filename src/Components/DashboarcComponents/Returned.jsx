import React, { useState } from "react";

export const Returned = () => {
    const [Return,setReturn]=useState(0);
  return <div className="card"><p>Returned Books</p>{Return}</div>;
};
