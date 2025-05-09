"use client";

import { Button } from "@/components/ui/button";
import React from "react";


export default function TextEXM() {
  return (
    <div className="w-full min-h-screen px-4 py-12 bg-background flex flex-col items-center justify-center ">
      <h1 className="text-4xl sm:text-4xl font-bold text-center mb-8">Meet FurniVision</h1>

      <div className="flex flex-col space-y-6 w-full max-w-3xl">
        
        <p className="text-center">*FurniVision* is a modern online furniture store designed to transform how people discover, browse, and purchase home furnishings. Our platform brings together convenience, style, and innovation to create a seamless shopping experience for users looking to enhance their living spaces. Whether it’s a cozy sofa, elegant dining table, or contemporary decor piece, FurniVision offers a curated collection that suits a variety of tastes and lifestyles.
Built using modern web technologies, FurniVision ensures a responsive and user-friendly interface that works smoothly across devices. The clean layout, intuitive navigation, and high-quality visuals allow users to explore products effortlessly. With detailed product descriptions, customer reviews, and secure payment options, our system empowers users to make confident buying decisions from the comfort of their home.
More than just a store, FurniVision represents a vision for smart, digital-first home shopping. The project aims to support sustainable design, promote local craftsmanship, and integrate features like AR previews, personalized recommendations, and real-time stock updates in future releases. Whether you are furnishing a new home or simply refreshing a room, FurniVision offers the inspiration and tools to bring your ideas to life. Our mission is simple: make quality furniture accessible, affordable, and just a click away.</p>
      </div>
      <Button onClick={() => window.location.href = "/project/dashboard"}>Dashboard</Button>
    </div>
  );
}
