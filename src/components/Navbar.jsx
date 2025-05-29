import React from 'react';

const Navbar = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Subrata.dev</h1>
        <ul className="hidden md:flex space-x-6 font-semibold text-gray-700">
          {['Home', 'About', 'Services', 'Projects','Skills','Contact'].map((section) => (
            <li
              key={section}
              onClick={() => scrollTo(section.toLowerCase())}
              className="cursor-pointer hover:text-indigo-600 transition"
            >
              {section}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
