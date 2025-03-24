'use client';

import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Model component for the 3D bread
function BreadModel({ scrollYProgress }: { scrollYProgress: { get: () => number } }) {
  const { scene } = useGLTF("/images/bread.glb");
  const meshRef = useRef<THREE.Group>(null);
  
  // Améliorer le matériau pour plus de netteté
  useEffect(() => {
    if (!meshRef.current) return;
    
    // Parcourir tous les maillages du modèle pour améliorer les matériaux
    meshRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Améliorer la netteté des textures
        if (child.material) {
          // Forcer un rendu de haute qualité
          child.material.precision = 'highp';
          child.material.needsUpdate = true;

          // Si c'est un MeshStandardMaterial
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.4; // Réduire la rugosité pour plus de netteté
            child.material.metalness = 0.2; // Légère apparence métallique pour refléter la lumière
          }
        }
        
        // Améliorer les ombres
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Rotate based on scroll position
    const rotationValue = scrollYProgress.get();
    meshRef.current.rotation.y = rotationValue * Math.PI * 4;
    meshRef.current.rotation.x = rotationValue * Math.PI * 0.75;
    meshRef.current.rotation.z = Math.sin(rotationValue * Math.PI) * 0.2;
  });
  
  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={50} 
      position={[0, -1, 0]} 
    />
  );
}

// Composant de scène 3D isolé pour éviter les problèmes d'hydratation
export default function Scene3D({ scrollYProgress }: { scrollYProgress: { get: () => number } }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          
          {/* Lumière halo derrière le modèle */}
          <pointLight position={[0, 0, -10]} intensity={2} color="#f8d568" />
          <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
          
          {/* Éclairage latéral pour définir les contours */}
          <spotLight 
            position={[-10, 2, 5]} 
            angle={0.3} 
            penumbra={0.8} 
            intensity={2} 
            color="#ffffff" 
            castShadow 
          />
          
          <BreadModel scrollYProgress={scrollYProgress} />
          <Environment preset="studio" />
          
          {/* Effet de flou artistique réduit pour plus de netteté */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={0.6} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-[1]"></div>
    </div>
  );
} 