import React from 'react'
import img1 from '/df.png'
import img2 from '/rcc.png'

const Projects = () => {
  const projects = [
    {
      image: img1,
      title: 'Digital Furniture',
      repo: 'https://github.com/subratasarker952/digitalfurnitureclient',
      live: 'https://digitalfurnitureclient.vercel.app/',
      description: 'Furniture showcase platform with product browsing using React and TailwindCSS.',
    },
    {
      image: img2,
      title: 'Radium Community Center',
      repo: 'https://github.com/subratasarker952/radiumcommunitycenterclient',
      live: 'https://radiumcommunitycenterclient.vercel.app/',
      description: 'Community center website built using React and Tailwind for social and educational outreach.',
    }
  ];

  return (
    <section id="projects" className="py-16 px-6 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <div className='h-[300px] overflow-hidden'>
              <img className='w-full' src={project.image} alt={project.title} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="mb-2 text-gray-600">{project.description}</p>
            <div className="flex gap-4">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub</a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-green-500">Live Site</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
