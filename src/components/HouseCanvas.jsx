import { Canvas, useFrame } from '@react-three/fiber';
import { AngleToRadians } from "../utils/angle";
import React, { useEffect, useRef } from 'react';
import Pink from './Pink';
import { OrbitControls } from '@react-three/drei';

const HouseCanvas = () => {
  const orbitControlRef = useRef(null);
  const initialCameraPosition = [
    8.173993330510854,
    3.416789719934244,
    1.4911649485286707
  ];
  const fixedPolarAngle = AngleToRadians(-20); // Set a fixed polar angle

  useEffect(() => {
    if (orbitControlRef.current) {
      // Set the camera's initial position
      orbitControlRef.current.object.position.set(...initialCameraPosition);
      // Set the target for orbiting
      orbitControlRef.current.target.set(1, 0, 0); // Adjust based on your model's center
      orbitControlRef.current.setPolarAngle(fixedPolarAngle); // Set the fixed polar angle
      orbitControlRef.current.update(); // Update controls to apply changes
    }
  }, [orbitControlRef]);

  return (
    <Canvas camera={{ position: initialCameraPosition, makeDefault: true }}>
      {/* Ambient light with higher intensity */}
      <ambientLight intensity={0.5} />
      {/* Add a directional light for stronger lighting */}
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      {/* You can also add a point light for more dynamic lighting */}
      <pointLight position={[10, 10, 10]} intensity={0.7} />

      <OrbitControls
        ref={orbitControlRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={AngleToRadians(65)} // Minimum polar angle slightly below fixed
        maxPolarAngle={AngleToRadians(75)} // Maximum polar angle slightly above fixed
      />
      <MouseTracker orbitControlRef={orbitControlRef} />
      <Pink />
    </Canvas>
  );
};

const MouseTracker = ({ orbitControlRef }) => {
  useFrame((state) => {
    if (orbitControlRef.current) {
      const { x, y } = state.mouse;

      // Rotate horizontally based on mouse movement while keeping the polar angle mostly fixed
      orbitControlRef.current.setAzimuthalAngle(-x * AngleToRadians(80)); // Adjust horizontal sensitivity

      // Slight adjustment to polar angle based on mouse movement
      const newPolarAngle = orbitControlRef.current.getPolarAngle() + y * AngleToRadians(15); // Adjust polar angle sensitivity
      // Clamp the polar angle within the specified limits
      orbitControlRef.current.setPolarAngle(Math.max(AngleToRadians(65), Math.min(AngleToRadians(75), newPolarAngle)));

      orbitControlRef.current.update();
    }
  });

  return null;
};

export default HouseCanvas;
