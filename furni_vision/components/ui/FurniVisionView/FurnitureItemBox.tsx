// import React, { useState } from "react";
// import { FurnitureItem } from "@/types";
// import { useFurniVision } from "@/context/FurniVisionContext";

// interface Props {
//   item: FurnitureItem;
//   gridSize: number; // e.g., 50px per unit
// }

// const FurnitureItemBox: React.FC<Props> = ({ item, gridSize }) => {
//   const {
//     //updateFurniturePosition,
//     updateFurnitureSize,
//     updateFurnitureRotation,
//   } = useFurniVision();

//   const [isResizing, setIsResizing] = useState(false);
//   const [rotation, setRotation] = useState(item.rotation || 0);

//   const handleResize = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsResizing(true);

//     const startX = e.clientX;
//     const startY = e.clientY;
//     const startWidth = item.dimensions.width;
//     const startDepth = item.dimensions.depth;

//     const onMouseMove = (moveEvent: MouseEvent) => {
//       const deltaX = Math.round((moveEvent.clientX - startX) / gridSize);
//       const deltaY = Math.round((moveEvent.clientY - startY) / gridSize);

//       updateFurnitureSize(item.id, {
//         width: Math.max(1, startWidth + deltaX),
//         depth: Math.max(1, startDepth + deltaY),
//       });
//     };

//     const onMouseUp = () => {
//       setIsResizing(false);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//   };

//   const rotateItem = () => {
//     const newRotation = (rotation + 90) % 360;
//     setRotation(newRotation);
//     updateFurnitureRotation(item.id, newRotation);
//   };

//   return (
//     <div
//       className="absolute"
//       style={{
//         left: item.position.x * gridSize,
//         top: item.position.y * gridSize,
//         width: item.dimensions.width * gridSize,
//         height: item.dimensions.depth * gridSize,
//         backgroundColor: item.color,
//         transform: `rotate(${rotation}deg)`,
//         transformOrigin: "center",
//         border: "2px solid #000",
//         position: "absolute",
//         cursor: isResizing ? "nwse-resize" : "move",
//       }}
//     >
//       <button
//         onClick={rotateItem}
//         className="absolute -top-5 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded"
//       >
//         ⟳
//       </button>
//       <div
//         className="absolute right-0 bottom-0 w-4 h-4 bg-white border border-black cursor-nwse-resize"
//         onMouseDown={handleResize}
//       />
//     </div>
//   );
// };

// export default FurnitureItemBox;
