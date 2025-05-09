"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Codepen, Paintbrush } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

export default function ProjectID() {

    const params = useParams();

    const router = useRouter();

    const Id = params.project_id as Id<"designs">

    const designs = useQuery(api.designs.getDesigns);

    const design = designs?.find((design) => design._id === Id);


  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-5xl h-5xl p-8 flex flex-col border gap-4 rounded-2xl shadow-sm'>
            <div className='w-full'>
                <h1 className='text-3xl font-bold'>{design?.name}</h1>
                <p className='text-muted-foreground text-xs'>Start your design from here</p>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
                <div className='w-full h-60vh'>
                    <Button asChild className='w-full h-full py-6' onClick={() => router.push(`/project/${Id}/showcase`)}>
                        <div className='flex flex-col items-center justify-center gap-4'>
                        <Paintbrush className='size-12' />
                            <h1>Collect Prebuild Objects & Models</h1>
                        </div>
                    </Button>
                </div>
                <div className='w-full h-60vh'>
                    <Button asChild className='w-full h-full' onClick={() => router.push(`/project/${Id}/FurniVision`)}>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <Codepen className='size-12'/>
                            <h1>Open 2D & 3D Playground</h1>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
        
    </div>
  )
}
