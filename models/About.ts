import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAbout extends Document {
  name: string
  title: string
  subtitle: string
  description: string
  avatar: string
  email: string
  phone: string
  location: string
  footerDescription: string
  footerConnectText: string
  resume: string
  socialLinks: {
    github: string
    linkedin: string
    website: string
  }
  highlights: [
    "MERN Stack Developer",
    "Responsive Web Design",
    "REST API Development",
    "MongoDB Database Design",
  ],
  createdAt: Date
  updatedAt: Date
}

const AboutSchema = new Schema<IAbout>(
  {
    name: { type: String, required: true, default: "Subrata Sarker" },
    title: { type: String, required: true, default: "Full-Stack Web Developer" },
    subtitle: { type: String, required: true, default: 'Building Scalable MERN Applications' },
    description: { type: String, required: true, default: "I'm a passionate Full-Stack Web Developer with over 5 years of experience in building modern, scalable web applications. My expertise lies in the MERN stack (MongoDB, Express.js, React, Node.js), and I'm constantly exploring new technologies to deliver cutting-edge solutions.I believe in writing clean, maintainable code and following best practices. My approach combines technical excellence with a deep understanding of user needs, resulting in applications that are both powerful and intuitive.When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or mentoring aspiring developers." },
    avatar: { type: String, default: "https://subratasarker.vercel.app/ProfilePicturePhoto.jpg" },
    footerDescription: { type: String, default: "Passionate full-stack developer focused on building scalable, responsive, and modern web applications using MERN technologies." },
    footerConnectText: { type: String, default: "I am available for freelance work, collaborations, and full-time opportunities." },
    resume: { type: String, default: "https://drive.google.com/file/d/1_EpWP2313rOU-Er3yTodThs37oX3FCiY" },
    email: { type: String, default:"subratasarker952@gmail.com" },
    phone: { type: String, default:"+8801576919246"},
    location: { type: String, default:"Dhaka, Bangladesh" },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
    highlights: [String],
  },
  { timestamps: true }
)

const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema)

export default About
