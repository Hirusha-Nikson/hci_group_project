"use client";

import React from "react";
import { Card } from "@/components/ui/card" // Optional if you're using a custom Card component

export default function Details() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-16 py-12 bg-background flex flex-col items-center">
      <h1 className="text-4xl sm:text-4xl font-bold text-center mb-8">Steps</h1>

      <div className="flex flex-col space-y-6 w-full max-w-3xl">
        
        <Card className="p-6 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Cheak room profile</h3>
          
        </Card>

        <Card className="p-6 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Add funiture</h3>
          
        </Card>

        <Card className="p-6 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Visualize in 3D</h3>
          
        </Card>

        <Card className="p-6 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Room customized</h3>
        
        </Card>
      </div>
    </div>
  );
}
