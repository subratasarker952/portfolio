import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const procced = window.confirm('Are you sure? Send Email?')
    if (!procced) return;

    emailjs
      .sendForm('emailjs_service', 'template_90t49fa', form.current, 'bsOx_AvoKmkoXe8dF')
      .then(
        (result) => {
          toast.success('Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          toast.error('Something went wrong. Try again.');
        }
      );
  };

  return (
    <section id="contact" className="py-16 px-6 md:px-16 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Contact Me</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full border px-4 py-2 rounded shadow-sm"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full border px-4 py-2 rounded shadow-sm"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full border px-4 py-2 rounded shadow-sm"
          ></textarea>
          <button
            type="submit"
            disabled={!form}
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full shadow hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
