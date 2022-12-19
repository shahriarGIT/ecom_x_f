import React from "react";
import { Link, NavLink } from "react-router-dom";

const Pagination = ({ pageNumber, totalPages, products, getFilteredURL }) => {
  // const navStyle = ({ isActive }) => {
  //   return {
  //     color: pageNumber ===  ? "#7734eb" : "",
  //     fontSize: isActive ? "1.5rem" : "",
  //   };
  // };

  return (
    <div className="row-flex bottom">
      <div className={products?.length === 0 ? "" : "paginationBox"}>
        {Number(pageNumber) - 1 > 0 ? (
          <NavLink
            to={getFilteredURL({
              page: Number(pageNumber) - 1,
            })}
          >
            Previous
          </NavLink>
        ) : null}
        {[...Array(totalPages).keys()].map((p) => (
          <NavLink
            key={p + 1} // p + 1 bcoz array starts from 0 index
            style={{
              color: `${Number(pageNumber) === p + 1 ? "#2387f8" : ""}`,
              fontSize: `${Number(pageNumber) === p + 1 ? "1.4rem" : ""}  `,
            }}
            to={getFilteredURL({ page: p + 1 })}
          >
            {/* "#d3c0f5" */}
            {p + 1}
          </NavLink>
        ))}
        {Number(pageNumber) + 1 <= totalPages ? (
          <NavLink
            to={getFilteredURL({
              page: Number(pageNumber) + 1,
            })}
          >
            Next
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
