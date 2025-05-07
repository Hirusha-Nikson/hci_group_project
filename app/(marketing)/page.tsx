"use client";

import Features from "./_screens/features";
import Hero from "./_screens/hero";


export default function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Hero/>
      <Features/>
    </div>
  );
};
