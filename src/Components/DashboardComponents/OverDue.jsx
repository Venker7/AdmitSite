import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardSkeleton } from "./CardSkeleton";
export const OverDue = ({ openmodal }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const handleOverduePop = () => {
    openmodal();
  };
  const [overdue, SetOverdue] = useState(0);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className="card" onClick={handleOverduePop}>
      <p>Overdue Books</p>
      {isLoading ? <CardSkeleton /> : overdue}
    </div>
  );
};
