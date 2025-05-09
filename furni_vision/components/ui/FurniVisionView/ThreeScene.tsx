"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useFurniVision } from "./context";

export const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentProject } = useFurniVision();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !currentProject) return;

    setLoading(true);

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    const camera = new THREE.PerspectiveCamera(
      60, // Wider field of view
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Controls with smoother damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI * 0.9;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add hemisphere light for more natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemisphereLight.position.set(0, 10, 0);
    scene.add(hemisphereLight);

    // Optional: Grid helper
    const gridHelper = new THREE.GridHelper(
      currentProject.room.dimensions.width,
      10,
      0xdddddd,
      0xeeeeee
    );
    gridHelper.position.y = -currentProject.room.dimensions.height / 2 + 0.01;
    scene.add(gridHelper);
    // const gridHelper = new THREE.GridHelper(currentProject.room.dimensions.width, 10);
    // scene.add(gridHelper);

    // Room with improved materials
    const roomGeometry = new THREE.BoxGeometry(
      currentProject.room.dimensions.width,
      currentProject.room.dimensions.height,
      currentProject.room.dimensions.depth
    );
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentProject.room.colors.wall),
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.85,
      roughness: 0.4,
      metalness: 0.1,
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    room.receiveShadow = true;
    scene.add(room);

    // Floor with better texture
    const floorGeometry = new THREE.PlaneGeometry(
      currentProject.room.dimensions.width,
      currentProject.room.dimensions.depth
    );
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentProject.room.colors.floor),
      roughness: 0.2,
      metalness: 0.0,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -currentProject.room.dimensions.height / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Furniture with improved visuals
    const furnitureMeshes: THREE.Mesh[] = [];
    currentProject.furniture.forEach((item) => {
      const geometry = new THREE.BoxGeometry(
        item.dimensions.width,
        item.dimensions.height,
        item.dimensions.depth
      );
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.color),
        roughness: 0.3,
        metalness: 0.1,
      });
      const furniture = new THREE.Mesh(geometry, material);
      furniture.castShadow = true;
      furniture.receiveShadow = true;
      furniture.position.set(
        item.position.x - currentProject.room.dimensions.width / 2,
        -currentProject.room.dimensions.height / 2 + item.dimensions.height / 2,
        item.position.z - currentProject.room.dimensions.depth / 2
      );
      scene.add(furniture);
      furnitureMeshes.push(furniture);
    });

    // Camera position with better initial view
    camera.position.set(
      currentProject.room.dimensions.width * 0.8,
      currentProject.room.dimensions.height * 0.6,
      currentProject.room.dimensions.depth * 1.2
    );
    controls.target.set(0, 0, 0);
    controls.update();

    // Handle window resize
    const handleResize = () => {
      camera.aspect =
        containerRef.current!.clientWidth / containerRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Animation with loading state
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      setLoading(false);
    };
    animate();

    // Cleanup
    return () => {
      controls.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeChild(renderer.domElement);
      // Dispose meshes, geometries, materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [currentProject]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
      <div ref={containerRef} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700 font-medium">Loading 3D scene...</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-sm text-gray-700">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};
