import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 px-4 md:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className='flex justify-center items-center'>
          <img
            src="/ProfilePicturePhoto.jpg"
            alt="Subrata Sarker"
            className="w-96 rounded-full object-cover shadow-md"
          />
        </div>
        <div className='flex justify-center items-center'>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">About Me</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              I am Subrata Sarker, a passionate MERN Stack Developer currently studying web development while
              working as a Medical Technologist. I love building beautiful, functional web apps using modern technologies like React, Node.js, and MongoDB.
              I’m always exploring and upgrading my skills to become a top-rated freelancer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
