import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Digital Core Icosahedron with Rich Distortion & Glowing Wireframe
function CoreSphere() {
  const meshRef = useRef(null);
  const wireRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.2;
      wireRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <Float speed={3.5} rotationIntensity={1.8} floatIntensity={2.2}>
      <group>
        {/* Solid Liquid-Metallic Core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.35, 18]} />
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#312e81"
            emissiveIntensity={0.9}
            roughness={0.08}
            metalness={0.92}
            distort={0.48}
            speed={2.6}
            wireframe={false}
          />
        </mesh>

        {/* Outer Holographic Lattice Wireframe */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[2.5, 4]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            wireframe={true}
            transparent={true}
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 2. Wide Holographic Orbital Rings
function OrbitingRings() {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.45;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.28;
  });

  return (
    <>
      <group ref={ring1Ref} rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.035, 16, 120]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.2} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 3.5]}>
        <mesh>
          <torusGeometry args={[3.7, 0.03, 16, 120]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0, Math.PI / 2.8, -Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[4.2, 0.025, 16, 120]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </>
  );
}

// 3. Dense Digital Stardust Cloud
function ParticleField() {
  const particlesRef = useRef(null);
  const count = 500;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 18;
    positions[i + 1] = (Math.random() - 0.5) * 18;
    positions[i + 2] = (Math.random() - 0.5) * 18;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.07;
      particlesRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e0e7ff"
        size={0.075}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

// 4. Interactive Scene with Mouse Parallax
function SceneContainer() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.mouse.x * Math.PI) / 4.5;
      const targetY = (state.mouse.y * Math.PI) / 4.5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 12, 6]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-10, -8, -6]} intensity={3.0} color="#818cf8" />
      <pointLight position={[6, -6, 6]} intensity={2.5} color="#f43f5e" />
      <pointLight position={[0, 8, 0]} intensity={2.0} color="#38bdf8" />
      
      <CoreSphere />
      <OrbitingRings />
      <ParticleField />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[520px] lg:min-h-[640px] relative pointer-events-auto flex items-center justify-center">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-3 border-primary-500/40 border-t-primary-400 animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <SceneContainer />
        </Canvas>
      </Suspense>
    </div>
  );
}
