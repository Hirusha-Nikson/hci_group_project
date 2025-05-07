/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="relative w-full min-h-screen">
            <div className="absolute w-full mx-auto h-screen overflow-y-hidden flex justify-center items-center">
                <Image src="/next-img.png" alt="hero image" width={1992} height={900}/>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-6xl font-bold text-center">Welcome to FurniVision</h1>
                <p className="text-2xl font-semibold text-center">Your online furniture store</p>
            </div>
        </div>
    );
}
 
export default Hero;