"use client";

import React from "react";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/ui/loader";
import CanvasDraw from "react-canvas-draw";
import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";
import { useSession } from "next-auth/react";
import axios from "axios";

const Notes = () => {
  const canvasRef = useRef(null);
  const { data: session } = useSession();

  const handleExport = () => {
    const canvas = canvasRef.current.canvasContainer.childNodes[1];

    // Create a new canvas with the same dimensions
    const invertedCanvas = document.createElement("canvas");
    invertedCanvas.width = canvas.width;
    invertedCanvas.height = canvas.height;
    const ctx = invertedCanvas.getContext("2d");

    // Draw the original image onto the inverted canvas
    ctx.drawImage(canvas, 0, 0);

    // Get the image data
    const imageData = ctx.getImageData(
      0,
      0,
      invertedCanvas.width,
      invertedCanvas.height
    );
    const data = imageData.data;

    // Invert the colors
    for (let i = 0; i < data.length; i += 4) {
      // Invert each color channel (red, green, blue)
      data[i] = 255 - data[i]; // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
      // Keep the alpha channel unchanged
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);

    // Convert the inverted canvas to a data URL
    const dataUrl = invertedCanvas.toDataURL();

    // Create a link element
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "inverted_drawing.png"; // Set the download filename

    // Simulate a click on the link to trigger the download
    link.click();
  };

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
    console.log("nicee");
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
  useEffect(() => {
    loadDrawingData();
    if (session) {
      axios
        .get(`/api/note/${session.user.id}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Event listener for keypress events
  useEffect(() => {
    const handleKeyPress = (event) => {
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
        loadTimeOffset={100}
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
        immediateLoading={true}
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
        <button onClick={() => canvasRef.current.clear()}>Clear</button>
        <button onClick={handleExport}>Download</button>
      </div>

      <ReactStickyNotes
        className="w-[10vw]"
        useCSS={true}
        containerHeight={"400px"}
        onChange={(type, payload, notes) => console.log(type, payload, notes)}
      />

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
