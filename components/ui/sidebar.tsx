import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
      <nav className="flex flex-col gap-4">
        <Button variant="ghost" className="justify-start">New Page</Button>
        <Button variant="ghost" className="justify-start">Gallery</Button>
        <Button variant="ghost" className="justify-start">Clients</Button>
        <Button variant="ghost" className="justify-start">Settings</Button>
      </nav>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Designs</h3>
        <ul className="space-y-2 text-gray-700">
          <li>Minimalist Office Setup</li>
          <li>Cozy Bedroom Layout</li>
          <li>Scandinavian Living Room</li>
          <li>Outdoor Lounge Ideas</li>
        </ul>
      </div>
    </aside>
  );
}
