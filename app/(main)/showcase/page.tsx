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
// import Image from "next/image";

const furnitures = [
  {
    name: "Furniture 1",
    image: "https://png.pngtree.com/png-clipart/20210127/ourmid/pngtree-3d-improvement-section-sofa-furniture-png-image_2846766.jpg",
    description: "Furniture description 1"
  },
  {
    name: "Furniture 2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7YNjax1mo-dzmIn2ltkUHHh5iFkR-0Uv_YQqzTaB6MjL3iUkNE_ei3t8Qnl547Y3mNFQ&usqp=CAU",
    description: "Furniture description 2"
  },
  {
    name: "Furniture 3",
    image: "https://png.pngtree.com/png-clipart/20220603/ourmid/pngtree-simple-3d-chair-home-furniture-png-image_4804523.png",
    description: "Furniture description 3"
  },
  {
    name: "Furniture 4",
    image: "https://png.pngtree.com/png-vector/20240512/ourlarge/pngtree-3d-mini-wooden-chair-png-image_12440327.png",
    description: "Furniture description 4"
  },
  {
    name: "Furniture 5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqoxBzfZvXLixafY29BTAHw0pQa_wAqM7ROQSzqtyTAUm4fEucP4zFETcxrHZodD60FvM&usqp=CAU",
    description: "Furniture description 5"
  },
  {
    name: "Furniture 6",
    image: "https://png.pngtree.com/png-clipart/20220610/ourmid/pngtree-home-furniture-3d-sofa-chair-red-color-png-image_4938916.png",
    description: "Furniture description 6"
  },
];

// https://dashboard.convex.dev/t/sugeeshwara-rathnayaka

const FurnitureShowcase = () => {

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
        <div className="w-full grid grid-cols-4 items-center justify-center gap-4">
          {furnitures.map((furniture) => (
            <Card className="w-full" key={furniture.name}>
              <CardContent>
                <img src={furniture.image} alt={furniture.name} width={280} height={200} />
              </CardContent>
              <CardHeader>
                <CardTitle>{furniture.name}</CardTitle>
                <CardDescription>{furniture.description}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button 
                onClick={() => {
                    const params = new URLSearchParams({
                      image: furniture.image,
                      description: furniture.description,
                    }).toString();
                    window.location.href = `/showcase/quickview/${encodeURIComponent(furniture.name)}?${params}`;
                  }}
                >Qiuck View</Button>
                <Button variant={"outline"}>Card Action</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurnitureShowcase;

