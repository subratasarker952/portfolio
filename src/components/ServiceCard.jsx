import React from "react";
export default function ServiceCard({ service }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md">
      <div className="text-3xl mb-4">{service.icon}</div>
      <h3 className="font-bold text-lg mb-2">{service.title}</h3>
      <p className="text-gray-500">{service.description}</p>
    </div>
  );
}