"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";


function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

  return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}
export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  const [designName, setDesignName] = useState("");
  const [isCreatingDesign, setIsCreatingDesign] = useState(false);

  const createDesign = useMutation(api.designs.createDesign);

  const handleCreateDesign = async () => {
    setIsCreatingDesign(true);
    if (!designName.trim()) return;
    await createDesign({
      name: designName,
      ownerName: user.user?.fullName ?? "",
      ownerId: user.user?.id ?? "",
    })
      .then(() => {
        setDesignName("");
        toast.success("Design created successfully!");
      })
      .catch(() => {
        toast.error("Failed to create design.");
      })
      .finally(() => {
        setIsCreatingDesign(false);
      });
  };
  const desings = useQuery(api.designs.getDesigns);

  const designsWithColors = desings?.map((design) => {
    const nameToNumber = design.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = Math.abs(nameToNumber) % 360;
    const hexColor = hslToHex(hue, 80, 60);
    return {
      ...design,
      color: hexColor,
    };
  });
  

  return (
    <div className="flex flex-col min-h-screen bg-background p-8">
      {/* Welcome Section */}
      <div className="mb-8 w-full flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome to Your Design Studio
          </h1>
          <p className="text-muted-foreground">
            Manage your designs and projects in one place
          </p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create a design</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new design</DialogTitle>
                <DialogDescription>
                  Add a name and click the button to create a new design.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Input
                  placeholder="Design Name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                />
                <Button
                  className="mt-4 w-full"
                  onClick={handleCreateDesign}
                  disabled={
                    isCreatingDesign ||
                    !designName ||
                    designName.trim().length === 0 ||
                    !user.isSignedIn
                  }
                >
                  Create Design
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Designs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{desings?.length}</div>
            <p className="text-xs text-muted-foreground">
              Last design{" "}
              {desings?.length
                ? new Date(
                    Math.max(...desings.map((d) => d.createdAt))
                  ).toLocaleString()
                : "N/A"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{desings?.length}</div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Client Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Based on 45 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Designs Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Designs</h2>
          <Button variant="outline">View All</Button>
        </div>

        
          <div className="grid grid-cols-3 gap-6">
            {desings?.map((desing) => (
            <Card className="hover:shadow-md transition-shadow" key={desing._id}>
              <CardHeader>
                <CardTitle className="text-sm">{desing.ownerName}</CardTitle>
                <CardDescription className="text-xs">
                  {format(new Date(desing.createdAt), "MMM dd, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className={`relative w-32 h-24 rounded-md overflow-hidden flex items-center justify-center`} style={{ backgroundColor: (designsWithColors ?? []).find((d) => d._id === desing._id)?.color }}>
                    <h1 className="text-6xl font-bold text-background">
                      {desing.name.slice(0, 2).toUpperCase()}
                    </h1>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col">
                      <p className="font-bold">{desing.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {desing._id}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 items-center">
                      <Button size="sm" variant="outline" onClick={() => router.push(`/project/${desing._id}`)}>
                        Open
                      </Button>
                      <Button size="icon" variant="secondary" >
                        <Trash className="size-3"/>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
      </div>
    </div>
  );
}
