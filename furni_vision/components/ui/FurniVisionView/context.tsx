"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FurnitureItem, Project, RoomConfig } from "./types";

const LOCAL_STORAGE_KEY = "furnivision-projects";

interface FurniVisionContextType {
  projects: Project[];
  currentProject: Project | null;
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;
  updateRoom: (config: Partial<RoomConfig>) => void;
  addFurniture: (item: Omit<FurnitureItem, "id" | "position">) => void;
  updateFurnitureColor: (id: string, color: string) => void;
  removeFurniture: (id: string) => void;
  updateFurniturePosition: (
    id: string,
    newPos: { x: number; y: number }
  ) => void; // ← add this
  updateFurnitureSize: (
    id: string,
    newSize: { width: number; depth: number }
  ) => void;
  updateFurnitureRotation: (id: string, angle: number) => void;
}

const FurniVisionContext = createContext<FurniVisionContextType | null>(null);

export const FurniVisionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setProjects(data.projects);
      setCurrentProjectId(data.currentProjectId);
    } else {
      const defaultProject = createNewProject("Modern Living Room");
      setProjects([defaultProject]);
      setCurrentProjectId(defaultProject.id);
    }
  }, []);

  const currentProject =
    projects.find((p) => p.id === currentProjectId) || null;

  const saveState = (newProjects: Project[], newCurrentId: string | null) => {
    setProjects(newProjects);
    setCurrentProjectId(newCurrentId);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ projects: newProjects, currentProjectId: newCurrentId })
    );
  };

  // const createNewProject = (name: string): Project => ({
  //   id: Date.now().toString(),
  //   name,
  //   room: {
  //     name: "New Room",
  //     dimensions: { width: 5, height: 4, depth: 2.7 },
  //     colors: { wall: "#ffffff", floor: "#f5f5f5", accent: "#3b82f6" },
  //   },
  //   furniture: [],
  // });

  // const addProject = (name: string) => {
  //   const newProject = createNewProject(name);
  //   saveState([...projects, newProject], newProject.id);
  // };

  // const selectProject = (id: string) => {
  //   saveState(projects, id);
  // };

  // const updateRoom = (config: Partial<RoomConfig>) => {
  //   if (!currentProject) return;
  //   const updated = {
  //     ...currentProject,
  //     room: { ...currentProject.room, ...config },
  //   };
  //   saveState(
  //     projects.map((p) => (p.id === currentProject.id ? updated : p)),
  //     currentProject.id
  //   );
  // };

  const createNewProject = (name: string): Project => ({
    id: Date.now().toString(),
    name,
    room: {
      name: "New Room",
      dimensions: { width: 5, height: 4, depth: 2.7 },
      colors: {
        wall: "#ffffff",
        floor: "#f5f5f5",
        ceiling: "#ffffff",
        accent: "#3b82f6",
        trim: "#e5e7eb",
      },
      lighting: {
        intensity: 0.8,
        color: "#ffffff",
        shadows: true,
        ambientLight: "#f5f5f5",
      },
      textures: {
        wall: null,
        floor: null,
        ceiling: null,
      },
      windows: [],
      doors: [],
    },
    furniture: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const addProject = (name: string) => {
    const newProject = createNewProject(name);
    saveState([...projects, newProject], newProject.id);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);
    const newCurrentId =
      currentProjectId === id
        ? newProjects.length > 0
          ? newProjects[0].id
          : null
        : currentProjectId;
    saveState(newProjects, newCurrentId);
  };

  const selectProject = (id: string) => {
    saveState(projects, id);
  };

  const updateRoom = (config: Partial<RoomConfig>) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      room: {
        ...currentProject.room,
        ...config,
        updatedAt: new Date().toISOString(),
      },
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const addFurniture = (item: Omit<FurnitureItem, "id" | "position">) => {
    if (!currentProject) return;

    const width = currentProject.room.dimensions.width;
    const depth = currentProject.room.dimensions.depth;

    // Find the next empty spot in the grid
    const occupied = currentProject.furniture.map((f) => ({
      x: f.position.x,
      y: f.position.y,
      width: f.dimensions.width,
      depth: f.dimensions.depth,
    }));

    const isOccupied = (x: number, y: number, w: number, d: number) => {
      return occupied.some(
        (o) =>
          x < o.x + o.width && x + w > o.x && y < o.y + o.depth && y + d > o.y
      );
    };

    const itemWidth = item.dimensions.width;
    const itemDepth = item.dimensions.depth;

    let posX = 1;
    let posY = 1;

    outer: for (let y = 1; y <= depth; y++) {
      for (let x = 1; x <= width; x++) {
        if (
          x + itemWidth - 1 <= width &&
          y + itemDepth - 1 <= depth &&
          !isOccupied(x, y, itemWidth, itemDepth)
        ) {
          posX = x;
          posY = y;
          break outer;
        }
      }
    }

    const newItem: FurnitureItem = {
      ...item,
      id: Date.now().toString(),

      position: {
        x: posX,
        y: posY,
        z: Math.random() * currentProject.room.dimensions.depth,
      },
    };
    const updated = {
      ...currentProject,
      furniture: [...currentProject.furniture, newItem],
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const updateFurnitureColor = (id: string, color: string) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      furniture: currentProject.furniture.map((item) =>
        item.id === id ? { ...item, color } : item
      ),
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const removeFurniture = (id: string) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      furniture: currentProject.furniture.filter((item) => item.id !== id),
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const updateFurniturePosition = (
    id: string,
    newPos: { x: number; y: number }
  ) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      furniture: currentProject.furniture.map((item) =>
        item.id === id
          ? {
              ...item,
              position: { ...item.position, x: newPos.x, y: newPos.y },
            }
          : item
      ),
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const updateFurnitureSize = (
    id: string,
    newSize: { width: number; depth: number }
  ) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      furniture: currentProject.furniture.map((item) =>
        item.id === id
          ? {
              ...item,
              dimensions: {
                ...item.dimensions,
                width: newSize.width,
                depth: newSize.depth,
              },
            }
          : item
      ),
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  const updateFurnitureRotation = (id: string, angle: number) => {
    if (!currentProject) return;
    const updated = {
      ...currentProject,
      furniture: currentProject.furniture.map((item) =>
        item.id === id
          ? {
              ...item,
              rotation: angle, // store rotation as a single number (degrees)
            }
          : item
      ),
    };
    saveState(
      projects.map((p) => (p.id === currentProject.id ? updated : p)),
      currentProject.id
    );
  };

  return (
    <FurniVisionContext.Provider
      value={{
        projects,
        currentProject,
        addProject,
        deleteProject,
        selectProject,
        updateRoom,
        addFurniture,
        updateFurnitureColor,
        updateFurniturePosition,
        updateFurnitureSize,
        updateFurnitureRotation,
        removeFurniture,
      }}
    >
      {children}
    </FurniVisionContext.Provider>
  );
};

export const useFurniVision = () => {
  const context = useContext(FurniVisionContext);
  if (!context) {
    throw new Error("useFurniVision must be used within a FurniVisionProvider");
  }
  return context;
};
