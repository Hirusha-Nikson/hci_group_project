"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>HCI Project</CardTitle>
          <CardDescription>HCI group project 82</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-amber-600">This is the home page of HCI Project</p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button variant="default">Okay</Button>
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
