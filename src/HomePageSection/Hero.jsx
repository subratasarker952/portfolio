import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 bg-white">
      <img
        src="/ProfilePicturePhoto.jpg"
        alt="Subrata Sarker"
        className="w-48 h-48 rounded-full shadow-lg object-cover"
      />
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hi, I’m Subrata Sarker</h1>
        <p className="text-xl text-gray-600 mb-4">
          MERN Stack Developer & Medical Technologist
        </p>
        <a
          href="#contact"
          className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
