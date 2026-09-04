"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center, Image as ThreeImage } from "@react-three/drei";

export function ThreeDProductViewer({ 
  metalColor = "gold", 
  imageUrl,
  category = "Ring"
}: { 
  metalColor?: "gold" | "rose" | "white";
  imageUrl?: string;
  category?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-ivory animate-pulse" />;

  const colors = {
    gold: "#FFD700",
    rose: "#B76E79",
    white: "#E5E4E2"
  };

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Center>
            <group rotation={[Math.PI / 8, 0, 0]}>
              {category.toLowerCase().includes("ring") && (
                <group>
                  {/* The Ring Band (Upright) */}
                  <mesh>
                    <torusGeometry args={[1.2, 0.12, 64, 128]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} />
                  </mesh>
                  {/* The Diamond / Stone */}
                  <mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <octahedronGeometry args={[0.35, 0]} />
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} metalness={0} roughness={0} ior={2.4} thickness={0.5} />
                  </mesh>
                  {/* Prongs */}
                  <mesh position={[-0.15, 1.15, -0.15]} rotation={[0, 0, Math.PI/8]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} /></mesh>
                  <mesh position={[0.15, 1.15, -0.15]} rotation={[0, 0, -Math.PI/8]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} /></mesh>
                  <mesh position={[-0.15, 1.15, 0.15]} rotation={[Math.PI/8, 0, Math.PI/8]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} /></mesh>
                  <mesh position={[0.15, 1.15, 0.15]} rotation={[Math.PI/8, 0, -Math.PI/8]}><cylinderGeometry args={[0.02, 0.02, 0.4]} /><meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} /></mesh>
                </group>
              )}

              {category.toLowerCase().includes("necklace") && (
                <group>
                  {/* Chain */}
                  <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
                    <torusGeometry args={[1.8, 0.03, 32, 100]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.2} />
                  </mesh>
                  {/* Pendant */}
                  <mesh position={[0, -1.8, 0]} rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={[0.4, 0.8, 4]} />
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} metalness={0} roughness={0} ior={2.4} thickness={0.5} />
                  </mesh>
                  <mesh position={[0, -1.4, 0]}>
                    <torusGeometry args={[0.1, 0.02, 16, 32]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.1} />
                  </mesh>
                </group>
              )}

              {category.toLowerCase().includes("earring") && (
                <group>
                  <mesh position={[-0.6, 0, 0]}>
                    <torusGeometry args={[0.5, 0.06, 32, 64]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} />
                  </mesh>
                  <mesh position={[-0.6, -0.5, 0]}>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} metalness={0} roughness={0} ior={2.4} thickness={0.5} />
                  </mesh>
                  
                  <mesh position={[0.6, 0, 0]}>
                    <torusGeometry args={[0.5, 0.06, 32, 64]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} />
                  </mesh>
                  <mesh position={[0.6, -0.5, 0]}>
                    <octahedronGeometry args={[0.2, 0]} />
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} metalness={0} roughness={0} ior={2.4} thickness={0.5} />
                  </mesh>
                </group>
              )}

              {category.toLowerCase().includes("bracelet") && (
                <group rotation={[Math.PI/2, 0, 0]}>
                  <mesh>
                    <torusGeometry args={[2, 0.1, 64, 128]} />
                    <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.15} />
                  </mesh>
                  {/* Small diamonds embedded */}
                  {[...Array(12)].map((_, i) => (
                    <mesh key={i} position={[2 * Math.cos(i * Math.PI/6), 2 * Math.sin(i * Math.PI/6), 0.1]} rotation={[0, 0, 0]}>
                      <octahedronGeometry args={[0.15, 0]} />
                      <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} metalness={0} roughness={0} ior={2.4} thickness={0.5} />
                    </mesh>
                  ))}
                </group>
              )}
              
              {/* Fallback for anything else */}
              {!category.toLowerCase().includes("ring") && !category.toLowerCase().includes("necklace") && !category.toLowerCase().includes("earring") && !category.toLowerCase().includes("bracelet") && (
                <mesh>
                  <torusGeometry args={[1.5, 0.2, 64, 128]} />
                  <meshStandardMaterial color={colors[metalColor]} metalness={1} roughness={0.1} />
                </mesh>
              )}
            </group>
          </Center>
          <Environment preset="studio" />
          <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={10} blur={2} far={4} />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minDistance={2} 
          maxDistance={10} 
        />
      </Canvas>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-widest uppercase pointer-events-none">
        Interactive 3D View
      </div>
    </div>
  );
}
