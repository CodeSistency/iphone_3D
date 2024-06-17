import { Canvas } from '@react-three/fiber'
import { Model } from './Model'
import { Environment, ScrollControls } from '@react-three/drei'

function Scene() {
  return (
    <Canvas
        camera={{
            fov: 65,
            position: [0, 0, 8.3]
        }}
    >
        <ScrollControls pages={7} damping={0.35}>
            <Model position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]}/>
        </ScrollControls>
     
        
        <ambientLight intensity={0.1} />
        <Environment
            files={"./models/abandoned_tiled_room_1k.hdr"}
        />
        {/* <Model /> */}
    </Canvas>
  )
}

export default Scene