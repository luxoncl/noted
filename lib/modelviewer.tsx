// "use client";

// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { useRef } from "react";
// import { Mesh, MeshStandardMaterial } from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// export const ModelViewer: React.FC = () => {
//   return (
//     <Canvas style={{ height: "500px", width: "100%" }}>
//       <EthereumModel />
//     </Canvas>
//   );
// };

// export const EthereumModel: React.FC = () => {
//   const myModel = useLoader(GLTFLoader, "assets/3d/bird.glb");
//   const modelRef = useRef<Mesh>(null);

//   useFrame((_state, delta) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += delta / 2;
//     }
//   });

//   if (myModel.scene) {
//     myModel.scene.traverse((child) => {
//       if (child instanceof Mesh) {
//         // Check if the child is a Mesh
//         const material = child.material as MeshStandardMaterial; // Cast material to MeshStandardMaterial
//         if (material) {
//           // Ensure material is not null
//           material.roughness = 0.5; // Set roughness to a lower value for increased glossiness
//         }
//       }
//     });
//   }

//   return (
//     <>
//       <pointLight position={[-10, -10, -10]} color="#ffffff" intensity={5000} />
//       <primitive object={myModel.scene} ref={modelRef} />
//     </>
//   );
// };
