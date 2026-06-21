import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}

import About from "@/models/About";
import Admin from "@/models/Admin";
import Experience from "@/models/Experience";
import Testimonial from "@/models/Testimonial";
import Skill from "@/models/Skill";
import Project from "@/models/Project";


async function seed() {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB Connected");

        // ========================================
        // CLEAR OLD DATA
        // ========================================

        await About.deleteMany({});
        await Admin.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Project.deleteMany({});
        await Testimonial.deleteMany({});

        console.log("🗑 Old data removed");

        // ========================================
        // ABOUT
        // ========================================

        await About.create({
            name: "Subrata Sarker",
            title: "Full-Stack Web Developer",
            subtitle: "Building Scalable MERN Applications",
            description: "I'm a passionate Full-Stack Web Developer with over 5 years of experience in building modern, scalable web applications. My expertise lies in the MERN stack (MongoDB, Express.js, React, Node.js), and I'm constantly exploring new technologies to deliver cutting-edge solutions.I believe in writing clean, maintainable code and following best practices. My approach combines technical excellence with a deep understanding of user needs, resulting in applications that are both powerful and intuitive.When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or mentoring aspiring developers.",
            avatar: "https://subratasarker.vercel.app/ProfilePicturePhoto.jpg",
            resume: "https://drive.google.com/file/d/1_EpWP2313rOU-Er3yTodThs37oX3FCiY",
            email: "subratasarker952@gmail.com",
            phone: "+8801576919246",
            location: "Dhaka, Bangladesh",

            socialLinks: {
                github: "https://github.com/subratasarker952",
                linkedin: "https://linkedin.com/in/subratasarker952",
                website: "https://subratasarker.vercel.app",
            },

            highlights: [
                "MERN Stack Developer",
                "Responsive Web Design",
                "REST API Development",
                "MongoDB Database Design",
            ],
        });

        console.log("✅ About seeded");


        // ========================================
        // Admin
        // ========================================

        await Admin.create({
            name: "Subrata Sarker",
            email: "subratasarker952@gmail.com",
            password:"sk123456"

        });

        console.log("✅ Admin seeded");

        // ========================================
        // SKILLS
        // ========================================

        await Skill.insertMany([
            {
                name: "JavaScript",
                icon: "javascript",
                category: "Frontend",
                proficiency: 90,
            },

            {
                name: "React JS",
                icon: "react",
                category: "Frontend",
                proficiency: 90,
            },

            {
                name: "Tailwind CSS",
                icon: "tailwindcss",
                category: "Frontend",
                proficiency: 90,
            },

            {
                name: "Node JS",
                icon: "nodedotjs",
                category: "Backend",
                proficiency: 85,
            },

            {
                name: "Express JS",
                icon: "express",
                category: "Backend",
                proficiency: 85,
            },

            {
                name: "MongoDB",
                icon: "mongodb",
                category: "Database",
                proficiency: 85,
            },

            {
                name: "Firebase",
                icon: "firebase",
                category: "Tools",
                proficiency: 80,
            },

            {
                name: "Git",
                icon: "git",
                category: "Tools",
                proficiency: 80,
            },

            {
                name: "GitHub",
                icon: "github",
                category: "Tools",
                proficiency: 85,
            },

            {
                name: "Postman",
                icon: "postman",
                category: "Tools",
                proficiency: 75,
            },
        ]);

        console.log("✅ Skills seeded");

        // ========================================
        // Experience
        // ========================================

        await Experience.insertMany([
            {
                company: "Self Employed",
                role: "Full-Stack MERN Developer",
                description: "Built multiple full-stack web applications using MERN stack including e-commerce and recharge systems. Focused on API development, authentication, and UI/UX improvements.",
                startDate: new Date("2023-01-01"),
                current: true,

                technologies: [
                    "React",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "Tailwind CSS",
                    "JWT",
                ],
            },

            {
                company: "Programming Hero (Course)",
                role: "Full-Stack Web Development Learner",
                description: "Completed a full-stack web development course and built real-world projects including e-commerce and admin dashboards.",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2022-12-31"),
                current: false,

                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Node.js",
                    "MongoDB",
                ],
            },

            {
                company: "Freelance Projects",
                role: "Frontend & Backend Developer",
                description:
                    "Worked on client-based projects and personal projects including OfferHouse, SuroviCosmetics, and OmgShopping platforms.",

                startDate: new Date("2023-06-01"),
                current: true,

                technologies: [
                    "React",
                    "Tailwind CSS",
                    "Express.js",
                    "MongoDB",
                    "Firebase",
                ],
            },
        ]);

        console.log("✅ Experience seeded");

        // ========================================
        // PROJECTS
        // ========================================

        await Project.insertMany([
            {
                title: "SuroviCosmetics",
                slug: "surovi-cosmetics",
                description: "E-commerce cosmetics platform with authentication and online ordering system.",
                longDescription: "Users can browse products, place orders, and complete payments online or via cash on delivery.",
                image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                images: [
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                ],
                technologies: [
                    "React JS",
                    "React Router",
                    "Tailwind CSS",
                    "Express JS",
                    "Firebase",
                    "MongoDB",
                    "Vercel",
                ],

                githubUrl: "https://github.com/subratasarker952",
                liveUrl: "https://your-live-link.com",
                category: "web",
                featured: true,
                status: "completed",
            },

            {
                title: "OfferHouse",
                slug: "offer-house",
                description: "Recharge and offers management platform with admin approval system.",
                longDescription: "Users can choose offers while admins manage and approve recharge requests.",
                image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",

                images: [
                    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
                ],
                technologies: [
                    "React",
                    "React Router",
                    "Tailwind CSS",
                    "Express JS",
                    "JWT",
                    "MongoDB",
                    "Vercel",
                ],

                githubUrl: "https://github.com/subratasarker952",
                liveUrl: "https://your-live-link.com",

                category: "web",
                featured: true,
                status: "completed",
            },

            {
                title: "OmgShopping",
                slug: "omg-shopping",
                description: "Modern e-commerce platform with SSLCommerz payment integration.",
                longDescription: "Users can browse products, register accounts, and complete secure online payments.",
                image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
                images: [
                    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
                ],
                technologies: [
                    "React",
                    "React Router",
                    "Tailwind CSS",
                    "Express JS",
                    "JWT",
                    "MongoDB",
                    "SSLCommerz",
                ],
                githubUrl: "https://github.com/subratasarker952",
                liveUrl: "https://your-live-link.com",
                category: "web",
                featured: true,
                status: "completed",
            },
        ]);

        console.log("✅ Projects seeded");

        console.log("🎉 Database Seed Completed");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed Error:", error);
        process.exit(1);
    }
}

seed();