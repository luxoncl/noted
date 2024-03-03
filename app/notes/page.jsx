"use client";

import React from "react";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/ui/loader";
import CanvasDraw from "react-canvas-draw";
import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Notes = () => {
  const canvasRef = useRef(null);
  const { data: session } = useSession();
  const [buttonAppended, setButtonAppended] = useState(false);
  const stickyNoteRef = useRef(null);
  const [summarizedNotes, setSummarizedNotes] = useState(
    "No notes to summarize"
  );

  const summarize = async () => {
    const notes = localStorage.getItem("react-sticky-notes");
    // Parse the JSON string into an array of objects
    const parsedNotes = JSON.parse(jsonData);

    // Extract only the text property from each object
    const textArray = parsedNotes.map((item) => item.text);

    console.log(textArray);
  };

  summarize();

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
  useEffect(() => {
    loadDrawingData();
    const fetchNotes = async () => {
      if (session) {
        await axios
          .get(`/api/note/${session.user.id}`)
          .then((response) => {
            console.log(response, "okok");
            // if (response.data) {
            //   response.data.forEach((note) => {
            //     ReactStickyNotes.addNote({
            //       id: note.id,
            //       title: note.title,
            //       content: note.content,
            //       x: note.x,
            //       y: note.y,
            //       zIndex: note.zIndex,
            //       color: note.color,
            //       isPinned: note.isPinned,
            //     });
            //   });
            // }
          })
          .catch((error) => {});
      } else {
        console.log("No session");
      }
    };
    fetchNotes();
  }, []);

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

  useEffect(() => {
    // Access the div element by className

    if (
      stickyNoteRef.current &&
      stickyNoteRef.current.classList.contains("rs-notes--note__selected")
    ) {
      const captchaOutputDiv = document.querySelector(
        ".rs-notes--note__selected.rs-notes--note__body.rs-notes--text"
      );
      console.log("caa", captchaOutputDiv);
    } else {
      console.log("no");
    }

    // Check if the div element exists and the button hasn't been appended yet
    // if (captchaOutputDiv && !buttonAppended) {
    //   // Create a new button element
    //   const button = document.createElement("button");
    //   button.textContent = "Click me";

    //   // Add event listener to the button
    //   button.addEventListener("click", () => {
    //     alert("Button clicked!");
    //   });

    // Append the button to the div element
    // captchaOutputDiv.appe(button);

    // Update state to indicate that the button has been appended
    // }
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

      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="fixed right-10 bottom-10 z-30">
            Summarize Notes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Hello this is you AI Summarizer to help you!
            </DialogTitle>
            <DialogDescription>{summarizedNotes}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div ref={stickyNoteRef}>
        <ReactStickyNotes
          className="w-[10vw]"
          useCSS={true}
          containerHeight={"400px"}
          // onBeforeChange={(type, payload, notes) => {
          //   console.log(type, payload, notes, "before change");
          //   return payload;
          // }}
          // onChange={async (type, payload, notes) => {
          //   console.log(type, payload, notes);
          //   if (type === "add") {
          //     console.log("Note added", payload, notes);
          //     await axios
          //       .post(`/api/note/${session.user.id}`, {
          //         ...payload,
          //       })
          //       .then((response) => {
          //         console.log(response);
          //       });
          //   }
          // }}
        />
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
