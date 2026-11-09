import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const YARN_COLORS = ['#ff7a6b', '#f5b942', '#f7a8c4']
const BALL_RADIUS = 1.5

function randomUnitVector() {
  const v = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
  )
  return v.lengthSq() === 0 ? v.set(0, 1, 0) : v.normalize()
}

/** A great-circle path around the sphere, with a little fuzz so the yarn
 *  strands look soft rather than perfectly smooth. */
function greatCircleCurve(normal: THREE.Vector3, radius: number) {
  const u = new THREE.Vector3(0, 1, 0).cross(normal)
  if (u.lengthSq() < 1e-4) u.set(1, 0, 0)
  u.normalize()
  const w = new THREE.Vector3().crossVectors(normal, u).normalize()

  const points: THREE.Vector3[] = []
  const segments = 24
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const point = new THREE.Vector3()
      .addScaledVector(u, Math.cos(angle) * radius)
      .addScaledVector(w, Math.sin(angle) * radius)
    const fuzz = 0.02
    point.x += (Math.random() - 0.5) * fuzz
    point.y += (Math.random() - 0.5) * fuzz
    point.z += (Math.random() - 0.5) * fuzz
    points.push(point)
  }
  return new THREE.CatmullRomCurve3(points, true)
}

function YarnStrands({ count }: { count: number }) {
  const strands = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const normal = randomUnitVector()
        const radius = BALL_RADIUS + (Math.random() - 0.5) * 0.12
        const curve = greatCircleCurve(normal, radius)
        return {
          geometry: new THREE.TubeGeometry(curve, 64, 0.05, 8, true),
          color: YARN_COLORS[i % YARN_COLORS.length],
        }
      }),
    [count],
  )

  return (
    <group>
      {strands.map(({ geometry, color }, i) => (
        <mesh key={i} geometry={geometry}>
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/** One loose thread that leaves the ball and curls downward. */
function LooseThread() {
  const geometry = useMemo(() => {
    const start = randomUnitVector().multiplyScalar(BALL_RADIUS)
    const curve = new THREE.CatmullRomCurve3([
      start,
      start.clone().add(new THREE.Vector3(0.4, 0.2, 0.3)),
      start.clone().add(new THREE.Vector3(0.9, -0.6, 0.2)),
      start.clone().add(new THREE.Vector3(1.2, -1.5, 0.1)),
      start.clone().add(new THREE.Vector3(1.0, -2.4, 0.0)),
    ])
    return new THREE.TubeGeometry(curve, 64, 0.035, 8, false)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ff7a6b" roughness={0.9} />
    </mesh>
  )
}

function AnimatedYarn({
  reducedMotion,
  strandCount,
}: {
  reducedMotion: boolean
  strandCount: number
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    // Slow spin...
    group.current.rotation.y += delta * 0.25
    // ...and a gentle tilt toward the mouse.
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.3,
      0.05,
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.2,
      0.05,
    )
  })

  return (
    <group ref={group}>
      <YarnStrands count={strandCount} />
      <LooseThread />
    </group>
  )
}

export default function YarnBall() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  // Under 768px: fewer strands to keep things at 60fps.
  const isMobile = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
    [],
  )

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 4]} intensity={60} color="#ffd9a8" />
      <AnimatedYarn
        reducedMotion={reducedMotion}
        strandCount={isMobile ? 24 : 40}
      />
    </Canvas>
  )
}
