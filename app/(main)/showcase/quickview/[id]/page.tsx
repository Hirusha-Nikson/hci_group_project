/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";

const QuickView = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const title = params.id;
  const image = searchParams.get("image");
  const description = searchParams.get("description");

  return (
    <div className="w-6xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-2 w-full gap-4 border rounded-2xl justify-center p-6 shadow-lg">
        <div className="w-full border flex justify-center rounded-2xl">
          <img src={image ?? ""} alt={title as string} width={500} height={400} />
        </div>
        <div className="flex flex-col ">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          <Button className="mt-auto" onClick={() => window.history.back()}>Go back</Button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;