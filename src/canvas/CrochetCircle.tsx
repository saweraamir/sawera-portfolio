import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const ROUND_COLORS = ['#ff7a6b', '#f5b942', '#f7a8c4']
const RING_SPACING = 0.3
const MAX_ROUNDS = 17 // round(20cm / 1.2)

type Stitch = { round: number; angle: number; colorIdx: number }

function buildStitches(): Stitch[] {
  const stitches: Stitch[] = []
  for (let n = 1; n <= MAX_ROUNDS; n++) {
    for (let i = 0; i < 6 * n; i++) {
      stitches.push({
        round: n,
        angle: (i / (6 * n)) * Math.PI * 2,
        colorIdx: (n - 1) % 3,
      })
    }
  }
  return stitches
}

function CrochetMesh({ rounds }: { rounds: number }) {
  const stitches = useMemo(buildStitches, [])
  const geometry = useMemo(
    () => new THREE.TorusGeometry(0.09, 0.035, 8, 16),
    [],
  )
  const meshes = useRef<(THREE.InstancedMesh | null)[]>([null, null, null])
  const scales = useRef(new Float32Array(stitches.length))
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Per-color instance lists: instanceIdx (within the InstancedMesh) -> global stitch index.
  const perColor = useMemo(() => {
    const groups: { stitch: Stitch; index: number }[][] = [[], [], []]
    stitches.forEach((stitch, index) =>
      groups[stitch.colorIdx].push({ stitch, index }),
    )
    return groups
  }, [stitches])

  const applyMatrices = (step: number) => {
    perColor.forEach((group, c) => {
      const mesh = meshes.current[c]
      if (!mesh) return
      let dirty = false
      group.forEach(({ stitch, index }, instanceIdx) => {
        const target = stitch.round <= rounds ? 1 : 0
        let cur = scales.current[index]
        if (Math.abs(target - cur) > 0.001) {
          cur += (target - cur) * step
          scales.current[index] = cur
          dirty = true
        }
        const radius = stitch.round * RING_SPACING
        dummy.position.set(
          Math.cos(stitch.angle) * radius,
          stitch.round * 0.02,
          Math.sin(stitch.angle) * radius,
        )
        dummy.rotation.set(Math.PI / 2, 0, 0)
        dummy.scale.setScalar(Math.max(cur, 0.0001))
        dummy.updateMatrix()
        mesh.setMatrixAt(instanceIdx, dummy.matrix)
      })
      if (dirty) mesh.instanceMatrix.needsUpdate = true
    })
  }

  // Hide every stitch until the first frame animates them in.
  const initialized = useRef(false)
  useFrame((_, delta) => {
    if (!initialized.current) {
      initialized.current = true
      applyMatrices(0)
      return
    }
    applyMatrices(Math.min(1, delta * 6))
  })

  return (
    <group>
      {ROUND_COLORS.map((color, c) => (
        <instancedMesh
          key={color}
          ref={(mesh) => {
            meshes.current[c] = mesh
          }}
          args={[geometry, undefined, perColor[c].length]}
        >
          <meshStandardMaterial color={color} roughness={0.9} />
        </instancedMesh>
      ))}
    </group>
  )
}

function SpinGroup({
  reducedMotion,
  children,
}: {
  reducedMotion: boolean
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.15
  })
  return <group ref={ref}>{children}</group>
}

export default function CrochetCircle({ rounds }: { rounds: number }) {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  // On touch screens disable OrbitControls so swiping over the canvas
  // scrolls the page; the slow auto-rotation keeps it alive.
  const isMobile = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
    [],
  )

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 8.5, 10], fov: 45 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 4]} intensity={60} color="#ffd9a8" />
      <SpinGroup reducedMotion={reducedMotion}>
        <CrochetMesh rounds={rounds} />
      </SpinGroup>
      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  )
}
