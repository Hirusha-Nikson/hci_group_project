import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface RoomColors {
  wall: string;
  floor: string;
  ceiling: string;
  accent: string;
  trim: string;
}

export interface Lighting {
  intensity: number;
  color: string;
  shadows: boolean;
  ambientLight: string;
}

export interface RoomTextures {
  wall: string | null;
  floor: string | null;
  ceiling: string | null;
}

export interface Opening {
  id: string;
  type: "window" | "door";
  position: { x: number; y: number; z: number };
  size: { width: number; height: number };
  style: string;
}

export interface RoomConfig {
  name: string;
  dimensions: Dimensions;
  colors: RoomColors;
  lighting: Lighting;
  textures: RoomTextures;
  windows: Opening[];
  doors: Opening[];
}

export interface FurnitureItem {
  imageUrl: string | StaticImport;
  id: string;
  name: string;
  type: string;
  dimensions: { width: number; depth: number; height: number };
  color: string;
  position: { x: number; y: number; z: number };
  rotation: number;
}

export interface Project {
  id: string;
  name: string;
  room: RoomConfig;
  furniture: FurnitureItem[];
  createdAt: string;
  updatedAt: string;
}
