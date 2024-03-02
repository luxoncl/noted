import { Suspense, suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Uni from "../models/uni";
{
  /*<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify center">
            POPUP
            </div> */
}
const Home = () => {
  const adjustUniForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [UniScale, Uniposition, Unirotation] = adjustUnivForScreenSize();
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen relative"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <spotLight />
          <hemisphereLight />
          <Uni position={Uniposition} scale={UniScale} rotation={Unirotation} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
