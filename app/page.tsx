"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "@/components/ui/loader";
import Island from "@/components/model/island";
import CanvasDraw from "react-canvas-draw";

const Home = () => {
  const handleSave = () => {
    console.log("save");
  };

  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify center">
        POPUP
      </div> */}
      hwllo
      <CanvasDraw
        onChange={null}
        loadTimeOffset={5}
        lazyRadius={0}
        brushRadius={5}
        brushColor="#444"
        catenaryColor="#0a0302"
        gridColor="rgba(150,150,150,0.17)"
        hideGrid={false}
        canvasWidth={1000}
        canvasHeight={800}
        disabled={false}
        // imgSrc=""
        saveData=""
        immediateLoading={false}
        hideInterface={true}
        gridSizeX={25}
        gridSizeY={25}
        gridLineWidth={0.5}
        hideGridX={false}
        hideGridY={false}
        enablePanAndZoom={false}
        mouseZoomFactor={0.01}
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

export default Home;
