"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Island from "@/components/ui/island";

const display = () => {
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        s
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <hemisphereLight />
        </Suspense>
        <Island />
      </Canvas>
    </section>
  );
};

export default display;
