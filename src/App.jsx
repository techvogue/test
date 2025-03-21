// src/App.jsx
import React from "react";
import WholeSlideImage from "./components/WholeSlideImage.jsx";
import ZoomHub from "./components/ZoomHub.jsx";
import LeftSidebar from "./components/LeftSideBbar.jsx"; // Import the new sidebar

function App() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex flex-col items-center p-4 space-y-4 flex-1">
        <h1 className="text-2xl font-bold mb-4">Whole Slide Image Viewer</h1>
        <div className="relative w-full flex justify-center items-center">
          <WholeSlideImage />
          <ZoomHub />
        </div>
      </div>
    </div>
  );
}

export default App;
