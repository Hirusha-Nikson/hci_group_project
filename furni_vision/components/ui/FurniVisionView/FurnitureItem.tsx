"use client";
import Image from "next/image";
import { useState } from "react";
import { useFurniVision } from "./context";

type FurnitureItemType = {
  id: string;
  name: string;
  color?: string;
  price: number;
  position?: { x: number; z: number };
  dimensions: { width: number; height: number; depth: number };
  imageUrl: string;
  category?: string;
  rating?: number;
};

export const FurnitureItem = ({ item }: { item: FurnitureItemType }) => {
  const { addFurniture, currentProject } = useFurniVision();
  const [imageLoading, setImageLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToRoom = async () => {
    setIsAdding(true);
    try {
      addFurniture({
        ...item,
        color: currentProject?.room.colors.accent || "#3b82f6",
        position: { x: 0, z: 0 }, // Default position
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {/* Badge for special items */}
      {item.category && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
          {item.category}
        </span>
      )}

      <div className="relative h-48 rounded-xl overflow-hidden mb-3 bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 w-full h-full animate-pulse bg-gray-200" />
        )}
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      {/* Rest of the component remains the same */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
          {item.rating && (
            <div className="flex items-center text-yellow-500 text-sm">
              ★ {item.rating.toFixed(1)}
            </div>
          )}
        </div>

        <p className="text-blue-600 text-sm font-semibold">
          ${item.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-xs">
          {item.dimensions.width}m × {item.dimensions.height}m ×{" "}
          {item.dimensions.depth}m
        </p>
      </div>

      <button
        onClick={handleAddToRoom}
        disabled={isAdding}
        className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 text-sm font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isAdding ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Adding...
          </>
        ) : (
          "Add to Room"
        )}
      </button>
    </div>
  );
};

// Furniture Catalog
export const FurnitureCatalog = () => {
  const { addProject, projects } = useFurniVision();
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const catalogItems: FurnitureItemType[] = [
    {
      id: "1",
      name: "Lounge Chair",
      price: 5199,
      dimensions: { width: 0.2, height: 0.7, depth: 0.8 },
      imageUrl: "/furniture/lounge-chair.jpg",
      category: "Popular",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Three-Seater Sofa",
      price: 5699,
      dimensions: { width: 2, height: 0.8, depth: 0.9 },
      imageUrl: "/furniture/sofa.jpg",
      rating: 4.5,
    },
    {
      id: "3",
      name: "Coffee Table",
      price: 5299,
      dimensions: { width: 1.2, height: 0.6, depth: 0.6 },
      imageUrl: "/furniture/coffee-table.jpg",
      category: "New",
    },
    {
      id: "4",
      name: "Dining Table",
      price: 5299,
      dimensions: { width: 1.5, height: 0.7, depth: 0.9 },
      imageUrl: "/furniture/dining-table.jpg",
      rating: 4.2,
    },
  ];

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    setIsCreatingProject(true);
    try {
      await addProject(newProjectName);
      setNewProjectName("");
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-2xl h-screen overflow-y-auto">
      <div className="grid grid-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="">
          <h2 className="text-xl font-bold text-gray-900">Furniture Catalog</h2>
          <p className="text-sm text-gray-500">
            {projects.length} projects • Browse and add items to your room
          </p>
        </div>

        <div className="grid grid-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name"
            className="w-full sm:w-56 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex items-center justify-center"
            onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
          />
          <button
            onClick={handleCreateProject}
            disabled={!newProjectName.trim() || isCreatingProject}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isCreatingProject ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {catalogItems.map((item) => (
          <FurnitureItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
