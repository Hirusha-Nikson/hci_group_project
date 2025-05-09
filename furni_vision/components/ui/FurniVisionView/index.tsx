"use client";
import { Box, ChevronLeft, ChevronRight, Square } from "lucide-react";
import { useState } from "react";
import { FurnitureCatalog } from "./FurnitureItem";
import { ThreeScene } from "./ThreeScene";
import { TwoDCanvasView, TwoDView } from "./TwoDView";
import { useFurniVision } from "./context";

export const FurniVision = () => {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [showCatalog, setShowCatalog] = useState(true);
  const { projects, currentProject, selectProject } = useFurniVision();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white border-b border-gray-100 z-10">
          {/* Selecr Project */}
          <div className="ml-auto min-w-[200px]">
            <select
              value={currentProject?.id || ""}
              onChange={(e) => selectProject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 2D or 3D */}
        <div className="p-4 sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("2d")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                viewMode === "2d"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Square size={18} className="shrink-0" />
              <span>2D View</span>
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                viewMode === "3d"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Box size={18} className="shrink-0" />
              <span>3D View</span>
            </button>
          </div>
        </div>
        <FurnitureCatalog />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* View Container */}
        <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100">
          {viewMode === "3d" ? (
            <div className="absolute inset-0">
              <ThreeScene />
            </div>
          ) : (
            <div className="absolute inset-0 overflow-auto p-4">
              <TwoDView />
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};
