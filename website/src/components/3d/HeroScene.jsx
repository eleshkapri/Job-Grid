import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 1. Digital Core Icosahedron with Rich Gradient Distortion
function CoreSphere({ isMobile }) {
  const meshRef = useRef(null);
  const radius = isMobile ? 1.35 : 1.85;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.55;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.4} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[radius, 16]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#3730a3"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.85}
          distort={0.42}
          speed={2.6}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// 2. Holographic Orbital Rings
function OrbitingRings({ isMobile }) {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const scale = isMobile ? 0.72 : 1;

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.7;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.5;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.4;
  });

  return (
    <group scale={scale}>
      <group ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.2, 0.025, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[3.7, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0, Math.PI / 3, -Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[4.2, 0.018, 16, 100]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 3. Floating Ambient Particles Cloud
function ParticleField({ isMobile }) {
  const particlesRef = useRef(null);
  const count = isMobile ? 220 : 380;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 14;
    positions[i + 2] = (Math.random() - 0.5) * 14;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
      particlesRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c084fc"
        size={isMobile ? 0.055 : 0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// 4. Interactive Scene with Continuous Autonomous Rotation & Gyro Dynamics
function SceneContainer({ isMobile }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous autonomous rotation so it is ALWAYS moving smoothly on mobile, laptop, and desktop!
      const time = state.clock.getElapsedTime();
      const autoWobbleX = Math.sin(time * 0.8) * 0.12;
      const autoWobbleY = Math.cos(time * 0.6) * 0.12;

      // Combine with mouse position if present
      const targetX = (state.mouse.x * Math.PI) / 6 + autoWobbleY;
      const targetY = (state.mouse.y * Math.PI) / 6 + autoWobbleX;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.95} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={2.5} color="#818cf8" />
      <pointLight position={[5, -5, 5]} intensity={2.0} color="#ec4899" />
      
      <CoreSphere isMobile={isMobile} />
      <OrbitingRings isMobile={isMobile} />
      <ParticleField isMobile={isMobile} />
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[540px] relative pointer-events-auto flex items-center justify-center select-none touch-pan-y">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 5.6 : 4.8], fov: isMobile ? 52 : 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* OrbitControls allows continuous autonomous spin + touch drag on all phones */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 2.8 : 2.0}
            rotateSpeed={0.8}
            dampingFactor={0.05}
            enableDamping={true}
          />
          <SceneContainer isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
