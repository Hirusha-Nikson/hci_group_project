"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Home</h1>
      {user.isSignedIn ? (
        <Button>Showcase</Button>
      ) : (
        <Button asChild>
          <SignInButton mode="modal">Sign In</SignInButton>
        </Button>
      )}
    </div>
  );
};
