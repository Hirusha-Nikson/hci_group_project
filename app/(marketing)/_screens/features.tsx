"use client";

//import { title } from "process";
import Image from "next/image";


const Features = () => {
    const features = [
        {
            title: "Feature 1",
            description: "Description 1",
            image: "/table.png"
        },
        {
            title: "Feature 2",
            description: "Description 2",
            image: "/table.png"
        },
        {
            title: "Feature 3",
            description: "Description 3",
            image: "/table.png"
        },
        {
            title: "Feature 4",
            description: "Description 4",
            image: "/table.png"
        },
        {
            title: "Feature 5",
            description: "Description 5",
            image: "/table.png"
        },
        {
            title: "Feature 6",
            description: "Description 6",
            image: "/table.png"
        },
    ];
    return (
        <section className="px-4 sm:px-8 lg:px-16 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
                >
                    <Image src={feature.image} alt={feature.title} width={200} height={200} />
                    <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
            ))}
            </div>
        </section>
    );
} 
export default Features;