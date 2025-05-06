import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="flex justify-between items-center mb-8">
      <nav className="flex gap-8 text-gray-700 font-medium">
        <a href="#">Furniture</a>
        <a href="#">Furniture Showcase</a>
        <a href="#">Room Planner</a>
        <a href="#">My Design</a>
        <a href="#">Contact Us</a>
      </nav>
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>
  );
}
