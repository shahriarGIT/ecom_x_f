import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = () => {
  return (
    <div className="row-flex center">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
