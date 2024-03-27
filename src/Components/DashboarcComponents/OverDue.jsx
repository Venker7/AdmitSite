import React, { useState } from "react";

export const OverDue = () => {
    const [overdue,SetOverdue]=useState(0)
  return <div className="card"><p>Overdue Books</p>{overdue}</div>;
};
