import React from 'react'
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { SiBootstrap, SiCss3, SiExpress, SiFigma, SiFirebase, SiGit, SiGithub, SiHtml5, SiJavascript, SiMongodb, SiNetlify, SiPostman, SiTailwindcss, SiVercel } from 'react-icons/si';

const Skills = () => {
    const skills = [
        { name: 'HTML5', icon: <SiHtml5 size={30} className=" text-blue-500" /> },
        { name: 'CSS3', icon: <SiCss3 size={30} className=" text-red-500" /> },
        { name: 'Bootstrap', icon: <SiBootstrap size={30} className=" text-indigo-500" /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss size={30} className=" text-teal-400" /> },
        { name: 'JavaScript', icon: <SiJavascript size={30} className=" text-yellow-400" /> },
        { name: 'React', icon: <FaReact size={30} className=" text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs size={30} className=" text-green-600" /> },
        { name: 'Express', icon: <SiExpress size={30} className=" text-red-500" /> },
        { name: 'MongoDB', icon: <SiMongodb size={30} className=" text-green-500" /> },
        { name: 'Firebasee', icon: <SiFirebase size={30} className=" text-yellow-500" /> },
        { name: 'Git', icon: <SiGit size={30} className=" text-red-500" /> },
        { name: 'Github', icon: <SiGithub size={30} className=" text-gray-800" /> },
        { name: 'Netlify', icon: <SiNetlify size={30} className=" text-teal-500" /> },
        { name: 'Vercel', icon: <SiVercel size={30} className=" text-gray-800" /> },
        { name: 'Figma', icon: <SiFigma size={30} className=" text-gray-800" /> },
        { name: 'Postman', icon: <SiPostman size={30} className=" text-red-400" /> },
    ];
    return (
        <section id="skills" className="py-16 px-4 bg-gray-50 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Skills & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded shadow">
                        {skill.icon}
                        <span className="text-lg font-medium">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills
