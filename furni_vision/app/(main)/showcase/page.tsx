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
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

const FurnitureShowcase = () => {

  const router = useRouter();

  const models = useQuery(api.uploadModel.getModels);

  const furnitures = (models ?? []).map((model) => ({
    id: model._id,
    name: model.name,
    image: model.image,
    description: model.description,
  }));

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-12">
      {/* Topic section */}
      <div className="w-full flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold">Furniture Showcase</h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body Section */}
      <div className="w-full py-12 border-t">
        <div className="w-full grid grid-cols-3 items-center justify-center gap-4">
          {furnitures.map((furniture) => (
            <Card className="w-full" key={furniture.name}>
              <CardContent>
                <img src={furniture.image} alt={furniture.name} width={280} height={156} className="border w-full rounded-lg"/>
              </CardContent>
              <CardHeader>
                <CardTitle>{furniture.name}</CardTitle>
                <CardDescription>{furniture.description}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button 
                onClick={() => {
                    router.push(`/showcase/quickview/${furniture.id}`);
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

