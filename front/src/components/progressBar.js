import { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        border: "1px solid #ccc",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#4CAF50",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};

export default ProgressBar;
