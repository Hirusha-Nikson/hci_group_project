'use client';
import { FurniVision } from '@/components/ui/FurniVisionView';
import { FurniVisionProvider } from '@/components/ui/FurniVisionView/context';


export default function FurniVisionPage() {
  return (
    <FurniVisionProvider>
      <FurniVision />
    </FurniVisionProvider>
  );
}