"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePlayerStore } from "../lib/store";

function CassetteMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const leftReelRef = useRef<THREE.Mesh>(null);
  const rightReelRef = useRef<THREE.Mesh>(null);
  const { isPlaying } = usePlayerStore();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Float animation
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(elapsed * 1.5) * 0.12;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.8) * 0.05;
      meshRef.current.rotation.z = Math.cos(elapsed * 0.8) * 0.05;
    }

    // Spin tape reels when audio is active
    if (isPlaying) {
      const spinSpeed = 0.04;
      if (leftReelRef.current) {
        leftReelRef.current.rotation.z -= spinSpeed;
      }
      if (rightReelRef.current) {
        rightReelRef.current.rotation.z -= spinSpeed;
      }
    }
  });

  return (
    <group ref={meshRef} rotation={[0.2, -0.4, 0.05]}>
      {/* 1. Main Transparent Outer Shell */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.7, 0.35]} />
        <meshPhysicalMaterial
          color="#3A1E1E"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.88} // Glassmorphism transmission
          thickness={1.5}
          ior={1.5}
        />
      </mesh>

      {/* 2. Top Matte Sticker Label */}
      <mesh position={[0, 0.3, 0.181]}>
        <boxGeometry args={[3.2, 1.1, 0.01]} />
        <meshStandardMaterial color="#EAE3D2" roughness={0.7} />
      </mesh>

      {/* 2b. Label Text (Default fonts are used to bypass blocking network downloads) */}
      <Center position={[0, 0.5, 0.19]}>
        <Text
          fontSize={0.24}
          color="#1C0A0A"
        >
          IIT Podcast
        </Text>
      </Center>
      <Center position={[0, 0.18, 0.19]}>
        <Text
          fontSize={0.12}
          color="#FF5E36"
        >
          WITH SOMENATH
        </Text>
      </Center>

      {/* 3. Central Window Hole */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.8, 0.6, 0.36]} />
        <meshPhysicalMaterial
          color="#0F0606"
          roughness={0.9}
          transmission={0.2}
          thickness={0.5}
        />
      </mesh>

      {/* 4. Left Spindle & Tape Pack */}
      <group position={[-0.9, -0.1, 0]}>
        {/* The Spindle Wheel */}
        <mesh ref={leftReelRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.28, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
          {/* Inner details to visualize rotation */}
          <mesh position={[0.25, 0, 0.15]}>
            <boxGeometry args={[0.15, 0.15, 0.03]} />
            <meshBasicMaterial color="#FF5E36" />
          </mesh>
          <mesh position={[-0.25, 0, 0.15]}>
            <boxGeometry args={[0.15, 0.15, 0.03]} />
            <meshBasicMaterial color="#FF5E36" />
          </mesh>
        </mesh>
        {/* Brown Tape Wound on Spindle */}
        <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.2, 32]} />
          <meshStandardMaterial color="#4A2F22" roughness={0.8} />
        </mesh>
      </group>

      {/* 5. Right Spindle & Tape Pack */}
      <group position={[0.9, -0.1, 0]}>
        {/* The Spindle Wheel */}
        <mesh ref={rightReelRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.28, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
          {/* Inner details to visualize rotation */}
          <mesh position={[0.25, 0, 0.15]}>
            <boxGeometry args={[0.15, 0.15, 0.03]} />
            <meshBasicMaterial color="#FF5E36" />
          </mesh>
          <mesh position={[-0.25, 0, 0.15]}>
            <boxGeometry args={[0.15, 0.15, 0.03]} />
            <meshBasicMaterial color="#FF5E36" />
          </mesh>
        </mesh>
        {/* Brown Tape Wound on Spindle */}
        <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
          <meshStandardMaterial color="#4A2F22" roughness={0.8} />
        </mesh>
      </group>

      {/* 6. Screw Details */}
      {[-1.9, 1.9].map((x, idx) => (
        [-1.15, 1.15].map((y, idy) => (
          <mesh key={`${idx}-${idy}`} position={[x, y, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 8]} />
            <meshStandardMaterial color="#C5A07F" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      ))}
    </group>
  );
}

// Flat HTML/CSS fallback placeholder to guarantee the hero section is never empty
const CassetteFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-card-bg/30 border border-white/[0.04] rounded-[28px] backdrop-blur-md">
    <div className="w-56 h-36 bg-[#2D1212]/90 border-2 border-accent-orange/30 rounded-2xl relative flex flex-col justify-between p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      
      {/* Tape label details */}
      <div className="w-full h-12 bg-[#EAE3D2] rounded-lg flex flex-col items-center justify-center border border-black/10">
        <span className="text-sm font-serif italic text-black font-semibold leading-none">IIT Podcast</span>
        <span className="text-[7px] font-mono text-accent-orange tracking-[0.2em] mt-1.5 uppercase font-extrabold">WITH SOMENATH</span>
      </div>

      {/* Spindles */}
      <div className="flex justify-between px-6 mb-2">
        <div className="w-9 h-9 rounded-full border border-stone-800 bg-black flex items-center justify-center shadow-inner">
          <div className="w-3.5 h-3.5 rounded-full border border-stone-700 bg-stone-900 animate-spin duration-3000" />
        </div>
        <div className="w-9 h-9 rounded-full border border-stone-800 bg-black flex items-center justify-center shadow-inner">
          <div className="w-3.5 h-3.5 rounded-full border border-stone-700 bg-stone-900 animate-spin duration-3000" />
        </div>
      </div>

      {/* Screw details */}
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-600" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-600" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-stone-600" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-stone-600" />
    </div>
    <span className="text-[9px] tracking-[0.3em] font-mono text-stone-500 uppercase mt-4 animate-pulse">Initializing WebGL Canvas...</span>
  </div>
);

export default function CassetteTape() {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative select-none flex items-center justify-center">
      {/* Background radial sunset gradient behind the 3D canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-accent-orange/30 via-accent-gold/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Reassuring CSS cassette representation visible while R3F compiles */}
      {!hasLoaded && <CassetteFallback />}

      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setHasLoaded(true)}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} castShadow />
        <pointLight position={[-5, 5, 2]} intensity={1.0} color="#FF5E36" />
        <pointLight position={[5, -5, 2]} intensity={1.5} color="#FFAE19" />

        <Suspense fallback={null}>
          <CassetteMesh />
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 1.7} 
            minPolarAngle={Math.PI / 2.3} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
