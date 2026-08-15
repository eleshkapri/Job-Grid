import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Digital Core Icosahedron with Rich Gradient Distortion
function CoreSphere() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.0, 16]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#3730a3"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.85}
          distort={0.45}
          speed={2.5}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// 2. Holographic Orbital Rings
function OrbitingRings() {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      <group ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.025, 16, 120]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[3.7, 0.02, 16, 120]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0, Math.PI / 3, -Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[4.2, 0.018, 16, 120]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </>
  );
}

// 3. Floating Ambient Particles Cloud
function ParticleField() {
  const particlesRef = useRef(null);
  const count = 400;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 16;
    positions[i + 1] = (Math.random() - 0.5) * 16;
    positions[i + 2] = (Math.random() - 0.5) * 16;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.06;
      particlesRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c084fc"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// 4. Interactive Scene with Mouse Parallax
function SceneContainer() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.mouse.x * Math.PI) / 5;
      const targetY = (state.mouse.y * Math.PI) / 5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.06);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={2.5} color="#818cf8" />
      <pointLight position={[5, -5, 5]} intensity={2.0} color="#ec4899" />
      
      <CoreSphere />
      <OrbitingRings />
      <ParticleField />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[480px] lg:min-h-[580px] relative pointer-events-auto flex items-center justify-center">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <SceneContainer />
        </Canvas>
      </Suspense>
    </div>
  );
}
