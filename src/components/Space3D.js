import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';

function Spacecraft() {
  const { scene } = useGLTF('/voyager.glb');
  return <primitive object={scene} scale={0.5} />;
}

const Space3D = () => (
  <section className="space3d">
    <h2>🛰️ 3D Voyager Model</h2>
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      <Suspense fallback={null}>
        <Spacecraft />
      </Suspense>
      <OrbitControls />
    </Canvas>
  </section>
);

export default Space3D;