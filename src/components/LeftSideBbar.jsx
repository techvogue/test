import React, { useEffect, useState } from "react";
import outputData from "../assets/output.json"; // Ensure the path is correct

const LeftSidebar = () => {
  const [rbcCount, setRbcCount] = useState(0);
  const [circularRBCCount, setCircularRBCCount] = useState(0);
  const [status, setStatus] = useState("Normal");

  useEffect(() => {
    try {
      console.log("Raw output data:", outputData);
  
      // Ensure inference_results is a string
      if (typeof outputData.inference_results === "string") {
        // Convert invalid JSON elements to valid JSON
        const cleanedString = outputData.inference_results
          .replace(/'/g, '"')         // Replace single quotes with double quotes
          .replace(/None/g, "null")   // Replace Python-style None with null
          .replace(/True/g, "true")   // Replace Python-style True with true
          .replace(/False/g, "false"); // Replace Python-style False with false
  
        // Parse the cleaned JSON string
        const parsedData = JSON.parse(cleanedString);
        console.log("Parsed data:", parsedData);
  
        // Extract detection results safely
        const results = parsedData?.output?.detection_results || [];
        console.log("Detection results:", results);
  
        // Set total RBC count
        setRbcCount(results.length);
  
        // Count only Circular_RBC entries
        const circularCount = results.reduce((count, item) => {
          return Array.isArray(item) && item[4] === "Circular_RBC" ? count + 1 : count;
        }, 0);
  
        console.log("Circular RBC count:", circularCount);
        setCircularRBCCount(circularCount);
  
        // Set status based on total RBC count (threshold: 50)
        setStatus(results.length > 50 ? "Abnormal" : "Normal");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, []);
  
  return (
    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto h-full">
      <h2 className="text-lg font-semibold mb-4">Findings Details</h2>

      {/* General Information */}
      <div className="mb-4 p-2 bg-white shadow rounded">
        <p><strong>Patient ID:</strong> {outputData.patient_id || "N/A"}</p>
        <p><strong>Sample Type:</strong> {outputData.sample_type || "N/A"}</p>
        <p><strong>Date:</strong> {outputData.date || "N/A"}</p>
      </div>

      {/* RBC Counts and Status */}
      <div className="mb-4 p-2 bg-white shadow rounded">
        <p><strong>Total RBC Count:</strong> {rbcCount}</p>
        <p><strong>Circular RBC Count:</strong> {circularRBCCount}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={status === "Abnormal" ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LeftSidebar;
