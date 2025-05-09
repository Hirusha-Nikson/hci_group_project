"use client";
import Image from "next/image";
import { useFurniVision } from "./context";
import { useState } from "react";

export const TwoDView = () => {
  const {
    currentProject,
    updateRoom,
    updateFurnitureColor,
    removeFurniture,
    updateFurniturePosition,
  } = useFurniVision();

  const [draggingFurnitureId, setDraggingFurnitureId] = useState<string | null>(
    null
  );

  if (!currentProject)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No project selected</p>
      </div>
    );

  const roomWidth = Math.max(
    1,
    Math.round(currentProject.room.dimensions.width)
  );
  const roomDepth = Math.max(
    1,
    Math.round(currentProject.room.dimensions.depth)
  );

  const handleDrop = (x: number, y: number) => {
    if (!draggingFurnitureId) return;
    const updatedFurniture = currentProject.furniture.find(
      (f) => f.id === draggingFurnitureId
    );
    if (!updatedFurniture) return;

    updateFurniturePosition(draggingFurnitureId, { x, y });
    setDraggingFurnitureId(null);
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-auto">
      {/* Room Grid View */}
      <div className="flex-1 bg-gray-100 p-4 border border-gray-300 rounded-lg">
        <div
          className="relative grid bg-gray-300"
          style={{
            gridTemplateColumns: `repeat(${roomWidth}, 1fr)`,
            gridTemplateRows: `repeat(${roomDepth}, 1fr)`,
            gap: "1px",
            height: "400px",
          }}
        >
          {Array.from({ length: roomWidth * roomDepth }).map((_, i) => {
            const x = (i % roomWidth) + 1;
            const y = Math.floor(i / roomWidth) + 1;
            return (
              <div
                key={`${x}-${y}`}
                className="relative bg-gray-200"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(x, y)}
              >
                {currentProject.furniture.map((item) => {
                  if (item.position.x === x && item.position.y === y) {
                    return (
                      <div
                        key={item.id}
                        className="absolute w-full h-full text-white text-xs flex items-center justify-center"
                        style={{
                          backgroundColor: item.color || "#3b82f6",
                          gridColumnEnd: `span ${item.dimensions.width}`,
                          gridRowEnd: `span ${item.dimensions.depth}`,
                        }}
                        draggable
                        onDragStart={() => setDraggingFurnitureId(item.id)}
                      >
                        {item.name}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Configuration Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Room Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Dimensions */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Dimensions</h3>
            <div className="grid grid-cols-3 gap-2">
              {["width", "depth", "height"].map((dim) => (
                <div key={dim}>
                  <label className="block text-sm text-gray-600 mb-1">
                    {dim.charAt(0).toUpperCase() + dim.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={currentProject.room.dimensions[dim]}
                    onChange={(e) =>
                      updateRoom({
                        dimensions: {
                          ...currentProject.room.dimensions,
                          [dim]: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Room Colors */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Colors</h3>
            {["wall", "floor", "accent"].map((colorKey) => (
              <div key={colorKey} className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600 w-20 capitalize">
                  {colorKey}:
                </label>
                <input
                  type="color"
                  value={currentProject.room.colors[colorKey]}
                  onChange={(e) =>
                    updateRoom({
                      colors: {
                        ...currentProject.room.colors,
                        [colorKey]: e.target.value,
                      },
                    })
                  }
                  className="h-8 w-8 rounded border border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Furniture List Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Furniture ({currentProject.furniture.length})
        </h3>

        {currentProject.furniture.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No furniture added yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProject.furniture.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-3 flex items-center gap-3"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.dimensions.width}m × {item.dimensions.depth}m
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) =>
                      updateFurnitureColor(item.id, e.target.value)
                    }
                    className="h-6 w-6 rounded border border-gray-300"
                  />
                  <button
                    onClick={() => removeFurniture(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Remove furniture"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
