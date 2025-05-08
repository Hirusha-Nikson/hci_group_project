"use client";
import { Suspense, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { div } from "three/tsl";

// function ModelSofa(props) {
//   const { nodes, materials } = useGLTF('/sofa_free_version.glb')
//   return (
//     <group {...props} dispose={null} scale={15}>
//       <mesh geometry={nodes.Object_4.geometry} material={materials['Material.005']} position={[-0.55, -0.632, -1.3]} rotation={[0, Math.PI / 2, 0]} scale={[0.62, 0.61, 0.21]} />
//       <mesh geometry={nodes.Object_6.geometry} material={materials['Material.002']} position={[0.075, 0.295, 2.804]} rotation={[0.696, 0.141, 0.087]} scale={[1, 1, 0.4]} />
//       <mesh geometry={nodes.Object_8.geometry} material={materials['Material.001']} position={[-0.78, -0.04, 1.034]} rotation={[0.691, 0.112, 0.134]} scale={[1, 1, 0.4]} />
//     </group>
//   )
// }

function DynamicModel({ url, ...props }: { url: string; [key: string]: any }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}
export default function Three() {

  const models = useQuery(api.uploadModel.getModels);

  return (
    <div>
      {models && models.length > 0 ? (
        <div>
          {models.map((model) => (
            <div className="border flex justify-center items-center h-screen bg-amber-400" key={model._id}>
            <Canvas camera={{ fov: 70, position: [80, 40, 90] }} className="w-full h-full">
              <Suspense fallback={null}>
              <ambientLight />
              <directionalLight position={[5, 10, 0]} intensity={2}/>
              {models && models.length > 0 ? (
                <DynamicModel scale={model.scale} url={`/${model.name || "sofa_free_veron.glb"}`} />
              ) : null}
              <OrbitControls autoRotate enableRotate={true}/>
              </Suspense>
            </Canvas>
          </div>
          ))}
        </div>
      ) : (
        <div>NO MODELS</div> 
      )
      }
    </div>
  )
}
