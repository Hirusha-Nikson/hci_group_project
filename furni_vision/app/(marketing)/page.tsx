"use client";

import Details from "./_screens/details-section";
import Features from "./_screens/features";
import Hero from "./_screens/hero";
import Footer from "@/components/ui/footer";
import TextEXM from "./_screens/text-exm";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">    </div>
  <div className="w-full min-h-screen flex flex-col">
      <Hero/>
      <TextEXM/>
      <Features/>
      <Details />
      <Footer/>
    </div>
  );
}
