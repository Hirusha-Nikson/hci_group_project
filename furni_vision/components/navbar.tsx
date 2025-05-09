"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/clerk-react";

export default function Navbar() {
  const user = useUser();

  return (
    <header className="w-full border-b h-[64px] bg-white flex items-center px-4 fixed z-50">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">FurniVision</h1>
          {user.isSignedIn ? (
            <div className="flex items-center gap-2">
              <Button variant={"link"} onClick={() => window.location.href = "/"}>Home</Button>
              <Button variant={"link"}>Dashboard</Button>
              <Button variant={"link"} onClick={() => window.location.href = "/showcase"}>Furniture Showcase</Button>
              <Button variant={"link"}>Contact</Button>
              <Button variant={"link"}>About</Button>
            </div>
          ) : (
            <div className="flex items-center gap-0.5">
              <Button variant={"link"}>Home</Button>
              <Button variant={"link"}>About</Button>
            </div>
          )}
          
          
        </div>
        <div>
          {user.isSignedIn ? (
            <UserButton afterSignOutUrl="/project/dashboard" />
          ) : (
            <Button asChild>
              <SignInButton mode="modal">Sign In</SignInButton>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
