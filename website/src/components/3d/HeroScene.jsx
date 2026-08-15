import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Digital Core Sphere with Organic Noise Distortion
function CoreSphere() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 12]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          distort={0.42}
          speed={2.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// 2. Holographic Orbital Ring with Pulsing Data Flow
function OrbitingRings() {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.25;
  });

  return (
    <>
      <group ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[2.9, 0.018, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0, Math.PI / 3, -Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[3.3, 0.015, 16, 100]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </>
  );
}

// 3. Floating Digital Ambient Particles Field
function ParticleField() {
  const particlesRef = useRef(null);
  const count = 300;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c084fc"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

// 4. Interactive Scene with Mouse Parallax
function SceneContainer() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth interpolation toward normalized mouse coordinates
      const targetX = (state.mouse.x * Math.PI) / 6;
      const targetY = (state.mouse.y * Math.PI) / 6;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#818cf8" />
      <pointLight position={[5, -5, 5]} intensity={1.5} color="#ec4899" />
      
      <CoreSphere />
      <OrbitingRings />
      <ParticleField />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[520px] relative pointer-events-auto">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <SceneContainer />
        </Canvas>
      </Suspense>
    </div>
  );
}
