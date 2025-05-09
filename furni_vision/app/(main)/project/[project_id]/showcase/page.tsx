/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function DynamicModel({ url, ...props }: { url: string; [key: string]: any }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}

const FurnitureShowcase = () => {

  const params = useParams();
  
  const Id = params.project_id as Id<"designs">

  const designs = useQuery(api.designs.getDesigns);

  const design = designs?.find((design) => design._id === Id);

  const router = useRouter();

  const models = useQuery(api.uploadModel.getModels);

  const furnitures = (models ?? []).map((model) => ({
    id: model._id,
    name: model.name,
    image: model.image,
    description: model.description,
    scale: model.scale || 15,
    filename: model.filename,
  }));

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-12">
      {/* Topic section */}
      <div className="w-full flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold">Furniture Showcase</h1>
          {/* <p className="text-muted-foreground text-sm">Collect Prebuild Objects & Models for <span className="font-bold">{design?.name}</span></p> */}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Chairs</DropdownMenuItem>
              <DropdownMenuItem>Tables</DropdownMenuItem>
              <DropdownMenuItem>Cupboards</DropdownMenuItem>
              <DropdownMenuItem>Shelves</DropdownMenuItem>
              <DropdownMenuItem>Lighting</DropdownMenuItem>
              <DropdownMenuItem>Decor</DropdownMenuItem>
              <DropdownMenuItem>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body Section */}
      <div className="w-full py-12 border-t">
        <div className="w-full grid grid-cols-3 items-center justify-center gap-4">
          {furnitures.map((furniture) => (
            <Card className="w-full" key={furniture.name}>
              <CardContent className="overflow-hidden h-48 flex justify-center items-center">
                <div className="flex justify-center items-center rounded-lg h-full w-full" key={furniture.id}>
                            <Canvas camera={{ fov: 70, position: [80, 40, 90] }} className="w-full">
                              <Suspense fallback={null}>
                              <ambientLight />
                              <directionalLight position={[5, 10, 0]} intensity={2}/>
                              {models && models.length > 0 ? (
                                <DynamicModel scale={furniture.scale + 5 || 15} url={`/${furniture.filename || "sofa_free_veron.glb"}`} />
                              ) : null}
                              <OrbitControls autoRotate enableRotate={true}/>
                              </Suspense>
                            </Canvas>
                          </div>
              </CardContent>
              <CardHeader>
                <CardTitle>{furniture.name}</CardTitle>
                <CardDescription>{furniture.description}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button 
                onClick={() => {
                    router.push(`/project/${Id}/showcase/quickview/${furniture.id}`);
                  }}
                >Qiuck View</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurnitureShowcase;

