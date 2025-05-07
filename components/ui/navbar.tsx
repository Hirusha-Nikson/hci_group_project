"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg flex justify-between items-center">
      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        3D Shop
      </div>
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li>
          <Link href="#features" className="hover:text-cyan-400 transition duration-300">Features</Link>
        </li>
        <li>
          <Link href="#showcase" className="hover:text-cyan-400 transition duration-300">Furniture Showcase</Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-cyan-400 transition duration-300">Contact</Link>
        </li>
      </ul>
      <div>
        <Link
          href="/login"
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-md hover:scale-105 transform transition duration-300"
        >
          Register / Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
