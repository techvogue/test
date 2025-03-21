// src/components/ZoomHub.jsx
import React from 'react';
import WSI from '../assets/WSI.png';

const ZoomHub = () => {
  return (
    <div className="absolute top-4 right-4 w-48 p-2 border-2 border-gray-800 bg-gray-100 shadow-md">
      <img src={WSI} alt="Zoom Hub" className="w-full h-auto" />
      <p className="text-sm text-center font-semibold mt-2">Zoom Hub View</p>
    </div>
  );
};

export default ZoomHub;
