import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
  title: string
  slug: string
  description: string
  thumbnail: string
  images: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
  longDescription: string
  technologies: string[]
  status: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    images: [{ type: String }],
    techStack: [{ type: String }],
    technologies: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Generate slug automatically
ProjectSchema.pre('save', function () {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
})

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema)

export default Project