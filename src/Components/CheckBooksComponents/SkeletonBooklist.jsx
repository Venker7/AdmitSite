import React from "react";
import "./SkeletonBooklist.css"
export const SkeletonBooklist = () => {
  return <div className="skeleton-bookcard">
        <div className="skeleton-bookimage">

        </div>
        <div className="skeleton-bookdata">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
        </div>;
};
