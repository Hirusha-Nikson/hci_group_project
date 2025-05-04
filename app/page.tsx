"use client";


import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <Navbar />

      <section className="py-24 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-6">
          Design Your Dream Room in 3D
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Visualize, customize, and save your furniture layout in an immersive futuristic environment.
        </p>
        <button className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300">
          Designer Login
        </button>
      </section>

      <section className="py-16 px-6 bg-black bg-opacity-20 backdrop-blur-md">
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { title: "3D Visualization" },
            { title: "Color or Shadow" },
            { title: "Save Design" },
            { title: "Room Customized" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl shadow-xl hover:shadow-cyan-500/50 text-center hover:scale-105 transition duration-300"
            >
              <h3 className="font-semibold text-xl text-cyan-400">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>


      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-300">Our Furniture Designs</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Chair", "Table", "Other Furnitures"].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl shadow-lg text-center hover:shadow-cyan-400/40 hover:scale-105 transition duration-300"
            >
              <div className="h-40 bg-gradient-to-tr from-gray-600 to-gray-800 rounded-lg mb-4"></div>
              <h4 className="font-semibold text-white">{item}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-400">Design Process</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Check Room Profile", "Add Furniture", "Visualize in 3D"].map((step, idx) => (
            <div
              key={idx}
              className="p-8 bg-gradient-to-tl from-blue-900 to-gray-900 rounded-3xl shadow-lg text-center hover:shadow-blue-500/50 hover:scale-105 transition duration-300"
            >
              <h4 className="font-medium text-lg text-blue-300">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      < Footer />

    </div>
  );
}
