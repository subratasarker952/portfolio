import React from 'react'

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Client A',
            feedback: 'Subrata did a great job delivering our project on time with high quality.',
        },
        {
            name: 'Client B',
            feedback: 'Very professional and quick to respond. Highly recommended!',
        },
    ];

    return (
        <section id="testimonials" className="py-16 px-6 md:px-16 bg-white">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {testimonials.map((t, i) => (
                    <div key={i} className="border p-4 rounded-lg shadow-sm">
                        <p className="italic mb-2">"{t.feedback}"</p>
                        <h4 className="font-semibold">– {t.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials
