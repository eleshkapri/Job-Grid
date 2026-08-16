import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 1. Digital Core Icosahedron with Balanced Proportions
function CoreSphere({ isMobile }) {
  const meshRef = useRef(null);
  const radius = isMobile ? 1.05 : 1.35;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[radius, 16]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#3730a3"
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.85}
          distort={0.38}
          speed={2.2}
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
  const scale = isMobile ? 0.75 : 1;

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.6;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.45;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.35;
  });

  return (
    <group scale={scale}>
      <group ref={ring1Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[2.9, 0.018, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0, Math.PI / 3, -Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[3.3, 0.015, 16, 100]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 3. Floating Ambient Particles Cloud
function ParticleField({ isMobile }) {
  const particlesRef = useRef(null);
  const count = isMobile ? 180 : 320;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 12;
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
        size={isMobile ? 0.05 : 0.055}
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

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const autoWobbleX = Math.sin(time * 0.7) * 0.08;
      const autoWobbleY = Math.cos(time * 0.5) * 0.08;

      const targetX = (state.mouse.x * Math.PI) / 8 + autoWobbleY;
      const targetY = (state.mouse.y * Math.PI) / 8 + autoWobbleX;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.9} />
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
    <div className="w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] relative pointer-events-auto flex items-center justify-center select-none touch-pan-y">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 6.8 : 6.2], fov: isMobile ? 48 : 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* OrbitControls allows continuous autonomous spin + touch drag on all phones and laptops */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 2.5 : 1.8}
            rotateSpeed={0.7}
            dampingFactor={0.05}
            enableDamping={true}
          />
          <SceneContainer isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
