"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

const Features = () => {
    return (
        <div className="px-4 sm:px-16 w-full mx-auto h-screen flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold text-center mb-6">Features</h2>

            <div className="grid grid-rows-2 gap-4 w-4xl h-[calc(100vh-200px)]">
                <div className="grid grid-cols-2 gap-4 ">
                    <Card className="relative bg-card rounded-lg shadow-md overflow-hidden min-w-full h-full">
                        <Image
                            src={"/farniture 3.webp"}
                            alt="Feature 7"
                            className="object-cover brightness-50 w-full h-full"
                            fill
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-background text-center px-4">
                            <h3 className="text-xl font-semibold text-shadow-white">three-seater sofa</h3>
                            <p className="text-xs text-muted-background">This is a modern, modular three-seater sofa in a soft grey fabric. It features clean lines, plush cushioning, and individual backrests with additional lumbar pillows for extra comfort. The low-profile design and wide seating make it perfect for a contemporary living space focused on comfort and flexibility.
                            </p>
                        </div>
                    </Card>

                    <Card className="relative bg-card rounded-lg shadow-md overflow-hidden w-full h-full">
                        <Image
                            src={"/farniture 4.jpg"}
                            alt="Feature 8"
                            className="object-cover brightness-50 w-full h-full"
                            fill
                        />
                        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
                            <h3 className="text-xl font-semibold text-shadow-white">glass-front display cabinet</h3>
                            <p className="text-xs text-muted-background">
                                This is a stylish, glass-front display cabinet with a sleek white frame and elegant curved legs. It features three interior glass shelves perfect for showcasing items like wine glasses, as seen in the image. The cabinet also includes two small drawers with gold knobs at the bottom, combining display and storage in a refined, space-saving design ideal for dining rooms or living areas.</p>
                        </div>
                    </Card>

                </div>

                <Card className=" bg-card rounded-lg shadow-md overflow-hidden w-full h-full grid grid-cols-2 ">
                    <div className="relative">
                    <Image
                        src="/fearniture 2.webp"
                        alt="Feature 9"
                        className="object-cover"
                        width={500}
                        height={600}
                    />
                    </div>

                    <div className=" px-8 flex flex-col text-right w-full">
                        <h3 className="text-xl font-semibold mb-2 text-shadow-white">modern wall-mounted unit</h3>
                        <p className="text-sm max-w-md ml-auto">This is a modern wall-mounted entertainment unit featuring a sleek, dual-tone floating shelf with open compartments for books, gadgets, and decor. A flat-screen TV is mounted above, while a vertical side panel holds multiple open shelves displaying decorative items like a potted plant, a Buddha head, and figurines. The design is minimalist and space-saving, perfect for contemporary living rooms.
                        </p>
                    </div>

                    

                </Card>
            </div>
        </div>


    );
};

export default Features;