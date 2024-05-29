import React from "react";
import "./SkeletonIssue.css"
export const SkeletonIssue = () => {
return <tr className="skeleton-row">
            <td >
                <div className="skeleton-name"><p></p></div>
            </td>
            <td>
                <div className="skeleton-author"><p></p></div>
            </td>
            <td>
                <div className="skeleton-id"><p></p></div>
            </td>
            <td>
                <div className="skeleton-sid"><p></p></div>
            </td>
            <td>
                <div className="skeleton-dt"><p></p></div>
            </td>
            <td>
                <div className="skeleton-dr"><p></p></div>
            </td>
            <td>
                <div className="skeleton-drnew"><p></p></div>
            </td>
            <td>
                <div className="remark">
                    <button className="skeleton-accept"></button>
                </div>
            </td>
        </tr>;
};
