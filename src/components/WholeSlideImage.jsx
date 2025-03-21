// src/components/WholeSlideImage.jsx
import React, { useState, useRef, useEffect } from "react";
import WSI from "../assets/WSI.png";
import outputData from "../assets/output.json";

const WholeSlideImage = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [detectionResults, setDetectionResults] = useState([]);
  const imageRef = useRef(null);



  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      setScale((prev) => Math.max(0.5, prev + e.deltaY * -0.001));
    };

    const handleMouseDown = (e) => {
      const startX = e.clientX;
      const startY = e.clientY;

      const handleMouseMove = (e) => {
        setPosition((prev) => ({
          x: prev.x + e.clientX - startX,
          y: prev.y + e.clientY - startY,
        }));
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const img = imageRef.current;
    img.addEventListener("wheel", handleWheel);
    img.addEventListener("mousedown", handleMouseDown);

    return () => {
      img.removeEventListener("wheel", handleWheel);
      img.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div
      className="relative border-2 border-gray-700 overflow-hidden"
      style={{
        width: "80%",
        height: "600px",
        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        cursor: "grab",
      }}
      ref={imageRef}
    >
      {/* Whole Slide Image */}
      <img src={WSI} alt="Whole Slide" className="w-full h-full object-cover" />

      {/* Render Bounding Boxes */}
      {detectionResults.map((item, index) => {
        const [x1, y1, x2, y2, label] = item;
        const boxWidth = x2 - x1;
        const boxHeight = y2 - y1;

        return (
          <div
            key={index}
            className="absolute border-2 border-red-500 bg-red-200/20"
            style={{
              left: `${x1}px`,
              top: `${y1}px`,
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              transform: `scale(${1 / scale})`, // Adjust bounding box scaling
              transformOrigin: "top left",
            }}
            title={label}
          />
        );
      })}
    </div>
  );
};

export default WholeSlideImage;
