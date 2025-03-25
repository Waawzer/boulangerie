'use client';

import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, useProgress, Html, Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Préchargement du modèle 3D - fonction exportée
export function preloadBreadModel() {
  // Ajouter un timestamp pour éviter les problèmes de cache
  const timestamp = Date.now();
  const modelPath = `/bread.glb?t=${timestamp}`;
  useGLTF.preload(modelPath, true);
  console.log(`Modèle 3D préchargé depuis ${modelPath}`);
  return true;
}

// Préchargement implicite lors de l'import du module
const timestamp = Date.now();
const MODEL_PATH = `/bread.glb?t=${timestamp}`;
useGLTF.preload(MODEL_PATH, true);

// Composant de chargement
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-[var(--accent)]">
        <div className="w-16 h-16 border-4 border-t-[var(--accent)] border-opacity-20 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-light">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// Model component for the 3D bread
function BreadModel({ scrollYProgress, isReady }: { scrollYProgress: { get: () => number }, isReady: boolean }) {
  // Essayer de charger avec plusieurs méthodes en cas d'échec
  const [modelError, setModelError] = useState(false);
  
  // Première tentative avec timestamp
  const gltfResult = useGLTF(MODEL_PATH, true);
  const { scene } = gltfResult;
  
  // Gestion d'erreur et alternative de chargement
  useEffect(() => {
    const handleError = () => {
      console.log("Fallback: tentative alternative de chargement du modèle");
      
      // Nettoyer les ressources du loader
      useGLTF.clear(MODEL_PATH);
      
      // Forcer une nouvelle tentative avec un timestamp différent
      const newTimestamp = Date.now();
      const alternativePath = `/bread.glb?t=${newTimestamp}&retry=true`;
      
      try {
        useGLTF.preload(alternativePath, true);
      } catch {
        console.error("Impossible de charger le modèle même en alternative");
      }
    };
    
    if (modelError) {
      handleError();
    }
    
    // Création d'un gestionnaire d'erreurs pour l'élément canvas
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
      canvasElement.addEventListener('error', () => setModelError(true));
      return () => canvasElement.removeEventListener('error', () => setModelError(true));
    }
  }, [modelError]);
  
  const meshRef = useRef<THREE.Group>(null);
  const [initialRotation] = useState(Math.random() * Math.PI * 2);
  
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
            child.material.metalness = 0.1; // Légère apparence métallique pour refléter la lumière
          }
        }
        
        // Améliorer les ombres
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    // Position initiale aléatoire pour une animation immédiate
    if (meshRef.current) {
      meshRef.current.rotation.y = initialRotation;
    }
  }, [initialRotation]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Animation de rotation de base (même sans scroll)
    const elapsedTime = state.clock.getElapsedTime();
    const baseRotation = initialRotation + Math.sin(elapsedTime * 0.2) * 0.05;
    
    // Rotate based on scroll position
    const rotationValue = scrollYProgress.get();
    meshRef.current.rotation.y = baseRotation + rotationValue * Math.PI * 7;
    meshRef.current.rotation.x = rotationValue * Math.PI * 0;
    meshRef.current.rotation.z = Math.sin(rotationValue * Math.PI) * 0;
    
    // Animation d'apparition
    if (!isReady) {
      meshRef.current.scale.set(0, 0, 0);
    } else {
      // Animation de scale pour une apparition progressive
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 25, 0.02);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 25, 0.02);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 25, 0.02);
    }
  });
  
  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={0} // Commence à 0 pour l'animation d'échelle
      position={[0, -3, 0]} 
    />
  );
}

// Composant de scène 3D isolé pour éviter les problèmes d'hydratation
export default function Scene3D({ scrollYProgress }: { scrollYProgress: { get: () => number } }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Préchargement supplémentaire si nécessaire
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Petit délai pour s'assurer que tout est prêt
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0} castShadow />
          
          {/* Lumière halo derrière le modèle */}
          <pointLight position={[0, 0, -10]} intensity={10} color="#f8d568" />
          <pointLight position={[0, 0, 5]} intensity={10} color="#ffffff" />
          
          {/* Éclairage latéral pour définir les contours */}
          <spotLight 
            position={[-10, 2, 5]} 
            angle={0.7} 
            penumbra={0.8} 
            intensity={0.02} 
            color="#ffffff" 
            castShadow 
          />
          
          <BreadModel scrollYProgress={scrollYProgress} isReady={isLoaded} />
          <Environment preset="studio" />
          
          {/* Effet de flou artistique réduit pour plus de netteté */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0} 
              luminanceSmoothing={0} 
              intensity={0.5} 
            />
          </EffectComposer>
          
          {/* Précharger les assets */}
          <Preload all />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-[1]"></div>
    </div>
  );
} 