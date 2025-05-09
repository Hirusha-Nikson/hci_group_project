"use client";
import { Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";



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
                <DynamicModel scale={model.scale || 15} url={`/${model.filename || "sofa_free_veron.glb"}`} />
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
