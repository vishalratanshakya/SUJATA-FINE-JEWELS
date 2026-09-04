"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, Torus, MeshReflectorMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";

function PlaceholderRing({ metalColor }: { metalColor: string }) {
  return (
    <group position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Ring Band */}
        <Torus args={[1, 0.15, 64, 128]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color={metalColor} 
            metalness={1} 
            roughness={0.15} 
          />
        </Torus>
        {/* Placeholder Diamond */}
        <Sphere args={[0.35, 32, 32]} position={[0, 0, 1]}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={1} 
            opacity={1} 
            roughness={0} 
            ior={2.4} 
            thickness={0.5} 
          />
        </Sphere>
      </Float>
    </group>
  );
}

export function ThreeDJewelleryExperience() {
  const [metal, setMetal] = useState<"gold" | "rose" | "white">("gold");
  const metalColors = {
    gold: "#FFD700",
    rose: "#B76E79",
    white: "#E5E4E2"
  };

  return (
    <section className="bg-[#0B0B0A] text-ivory relative overflow-hidden flex flex-col lg:flex-row min-h-[450px] lg:min-h-[550px] w-full">
      
      {/* Left: Controls & Info (30%) */}
      <div className="w-full lg:w-[30%] p-8 lg:p-16 xl:p-24 flex flex-col justify-center space-y-8 z-20 bg-[#121212] border-r border-white/5">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
            3D JEWELLERY EXPERIENCE
          </h2>
          <div className="w-12 h-[1px] bg-champagne mb-8" />
        </div>

        <ul className="space-y-4 text-xs tracking-widest text-white/60">
          <li className="flex items-center space-x-3">
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>360° Rotate</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>Zoom In/Out</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>Change Metal</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="w-1 h-1 rounded-full bg-champagne" />
            <span>Change Diamond</span>
          </li>
        </ul>

        <div className="flex space-x-4">
          <button 
            onClick={() => setMetal("gold")}
            className={`w-8 h-8 rounded-full bg-[#FFD700] border-2 transition-all ${metal === 'gold' ? 'border-white scale-110' : 'border-transparent opacity-50'}`} 
            aria-label="Yellow Gold"
          />
          <button 
            onClick={() => setMetal("rose")}
            className={`w-8 h-8 rounded-full bg-[#B76E79] border-2 transition-all ${metal === 'rose' ? 'border-white scale-110' : 'border-transparent opacity-50'}`} 
            aria-label="Rose Gold"
          />
          <button 
            onClick={() => setMetal("white")}
            className={`w-8 h-8 rounded-full bg-[#E5E4E2] border-2 transition-all ${metal === 'white' ? 'border-white scale-110' : 'border-transparent opacity-50'}`} 
            aria-label="White Gold"
          />
        </div>

        <button className="border border-champagne/50 hover:bg-champagne hover:border-champagne hover:text-white text-champagne px-8 py-3 text-xs tracking-widest uppercase transition-all self-start mt-4">
          View In 3D
        </button>
      </div>

      {/* Right: 3D Canvas (70%) */}
      <div className="w-full lg:w-[70%] h-[500px] lg:h-auto relative cursor-grab active:cursor-grabbing bg-[#080808]">
        <Canvas camera={{ position: [0, 1.5, 3.5], fov: 45 }} className="w-full h-full">
          <color attach="background" args={["#080808"]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={null}>
            <PlaceholderRing metalColor={metalColors[metal]} />
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
          
          <OrbitControls 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={1.0} 
            minDistance={2} 
            maxDistance={6} 
          />
        </Canvas>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/40 text-xs tracking-widest pointer-events-none">
          <span>Drag to rotate</span>
          <span className="px-2 border border-white/20 rounded-full">360°</span>
        </div>

        {/* Previews Overlaid on Right Side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border border-white/10 rounded overflow-hidden cursor-pointer hover:border-champagne/50 transition-colors bg-charcoal/80"
            >
              <div className="w-full h-full flex items-center justify-center text-[10px] text-white/30 tracking-widest">
                ANGLE {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
