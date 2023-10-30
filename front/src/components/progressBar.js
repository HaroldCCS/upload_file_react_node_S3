import { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Actualiza el ancho de la barra de progreso cuando cambia el progreso
    setWidth(progress);
  }, [progress]);

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
          width: `${width}%`,
          height: "100%",
          backgroundColor: "#4CAF50",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};

export default ProgressBar;
