"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-cyan-400 transition duration-300">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
        <div className="text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} 3D Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer