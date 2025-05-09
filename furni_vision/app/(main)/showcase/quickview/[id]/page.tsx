"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "convex/react";
import { Undo, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function DynamicModel({
  url,
  colorOverride,
  ...props
}: {
  url: string;
  [key: string]: any;
}) {
  const { scene } = useGLTF(url);

  scene.traverse((child: any) => {
    if (child.isMesh && child.material) {
      child.material.color.set(colorOverride); // Or use a dynamic prop like props.color
    }
  });

  return <primitive object={scene} {...props} />;
}

const QuickView = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [originalColor, setOriginalColor] = useState<string | null>(null);

  const params = useParams();

  const router = useRouter();

  const id = params.id as Id<"models">;

  const models = useQuery(api.uploadModel.getModels);

  const model = models?.find((model) => model._id === id);

  useEffect(() => {
    if (model?.colors?.length && !originalColor) {
      setOriginalColor(model.colors[0]); // assume first is original or customize
    }
  }, [model, originalColor]);

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col justify-center px-12 bg-foreground/40">
      <div className="grid grid-cols-6 w-full gap-6 border rounded-2xl justify-center p-6 shadow-lg h-[calc(100vh-100px)] bg-background">
        <div className="w-full border flex justify-center rounded-2xl col-span-4 overflow-hidden">
          <div className="border flex justify-center items-center w-full h-full">
            <Canvas
              camera={{ fov: 70, position: [80, 40, 90] }}
              className="w-full h-full"
            >
              <Suspense fallback={null}>
                <ambientLight />
                <directionalLight position={[5, 10, 0]} intensity={2} />
                <DynamicModel
                  scale={models?.find((model) => model._id === id)?.scale || 15}
                  url={`/${models?.find((model) => model._id === id)?.filename}`}
                  colorOverride={
                    selectedColor ||
                    models?.find((model) => model._id === id)?.colors?.[0]
                  }
                />
                <OrbitControls autoRotate enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <div className="w-full flex justify-end pb-6">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => router.back()}
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">
              {models?.find((model) => model._id === id)?.name}
            </h1>
            <p className="text-muted-foreground">
              {models?.find((model) => model._id === id)?.description}
            </p>
            <p className="font-bold text-xl">${models?.find((model) => model._id === id)?.price}</p>
          </div>

          <div className="flex gap-2 my-4 items-center">
            <Button variant="outline" size={"icon"} onClick={() => setSelectedColor(null)}>
              <Undo />
            </Button>
            {models
              ?.find((model) => model._id === id)
              ?.colors?.map((color, index) => (
                <Button
                  className="rounded-full"
                  variant={null}
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color,
                    width: 32,
                    height: 32,
                    borderRadius: "20%",
                    border:
                      selectedColor === color
                        ? `1px solid ${selectedColor}`
                        : "1px solid gray",
                    outline:
                      selectedColor === color ? `2px solid black` : "none",
                  }}
                />
              ))}
          </div>

          <Button className="mt-auto" onClick={() => router.back()}>
            Add to design
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
