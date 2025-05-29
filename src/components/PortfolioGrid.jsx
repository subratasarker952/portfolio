import React from "react";
export default function PortfolioGrid() {
  const projects = [
    { title: 'Blog App', image: 'https://via.placeholder.com/300' },
    { title: 'E-commerce UI', image: 'https://via.placeholder.com/300' },
    { title: 'Dashboard', image: 'https://via.placeholder.com/300' }
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((p, i) => (
        <div key={i} className="bg-white rounded shadow overflow-hidden">
          <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}