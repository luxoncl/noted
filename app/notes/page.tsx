"use client";

import React from "react";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/ui/loader";
import Island from "@/components/model/island";
import CanvasDraw from "react-canvas-draw";

const Notes = () => {
  const canvasRef = useRef<CanvasDraw>(null);

  // Function to handle undo action
  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  // Function to handle save action
  const handleSave = () => {
    if (canvasRef.current) {
      const drawingData = canvasRef.current.getSaveData();
      // Save drawingData to your desired location (e.g., file, database)
      console.log(drawingData);
      localStorage.setItem("drawingData", JSON.stringify(drawingData));
    }
  };

  const loadDrawingData = () => {
    const savedDrawingData = localStorage.getItem("drawingData");
    if (savedDrawingData) {
      try {
        const parsedData = JSON.parse(savedDrawingData);
        if (canvasRef.current) {
          canvasRef.current.loadSaveData(parsedData, true);
        }
      } catch (error) {
        console.error("Error parsing saved drawing data:", error);
      }
    }
  };

  // Event listener for keypress events
  useEffect(() => {
    loadDrawingData();

    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if Ctrl (or Command) key is pressed along with 'Z' for undo
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z" || event.key === "Z") {
          handleUndo();
        }
      }

      // Check if Ctrl (or Command) key is pressed along with 'S' for save
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "s" || event.key === "S") {
          event.preventDefault(); // Prevent default browser save action
          handleSave();
        }
      }
    };

    // Add event listener for keypress events
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify center">
        POPUP
      </div> */}
      <CanvasDraw
        ref={canvasRef}
        onChange={null}
        loadTimeOffset={5}
        lazyRadius={0}
        brushRadius={5}
        brushColor="#444"
        catenaryColor="#0a0302"
        gridColor="rgba(150,150,150,0.17)"
        hideGrid={false}
        canvasWidth={1200}
        canvasHeight={600}
        disabled={false}
        // imgSrc=""
        immediateLoading={false}
        hideInterface={true}
        gridSizeX={25}
        gridSizeY={25}
        gridLineWidth={0.5}
        hideGridX={false}
        hideGridY={false}
        enablePanAndZoom={false}
        mouseZoomFactor={0.01}
        zoomExtents={{ min: 0.1, max: 2 }}
      />
      <div className="flex gap-4 mt-3">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={() => (canvasRef.current as any).clear()}>
          Clear
        </button>
      </div>
      {/* <Canvas
        className="w-full h-screen relative"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <spotLight />
          <hemisphereLight />
          <Island />
        </Suspense>
      </Canvas> */}
    </section>
  );
};

export default Notes;
