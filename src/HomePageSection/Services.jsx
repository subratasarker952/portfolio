import React from 'react'
import ServiceCard from '../components/ServiceCard'

const Services = () => {
    return (
        <section id='services' className="bg-white py-32 px-4">
            <h3 className="text-3xl font-bold text-indigo-600 mb-8 text-center">What I Do</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    { title: 'Frontend Development', description: 'React, Vite, TailwindCSS based UIs' },
                    { title: 'MERN Stack Apps', description: 'Full-stack apps with MongoDB, Express, React, Node.js' },
                    { title: 'Responsive Design', description: 'Mobile-first, cross-browser compatible interfaces' },
                ].map((service, i) => (
                    <ServiceCard key={i} service={service}>

                    </ServiceCard>
                ))}
            </div>
        </section>
    )
}

export default Services
