// src/components/ui/avatar.tsx
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define basic Avatar style
const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
);

// Avatar container
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(avatarVariants(), className)} {...props} />
  )
);
Avatar.displayName = "Avatar";

// Avatar image inside
const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

// Fallback if image fails
const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// Export everything
export { Avatar, AvatarImage, AvatarFallback };
