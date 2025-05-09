"use client";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-foreground py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">© {new Date().getFullYear()} FurniVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer