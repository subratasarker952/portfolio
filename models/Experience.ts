import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IExperience extends Document {
  company: string
  role: string
  description: string
  startDate: Date
  endDate?: Date
  current: boolean
  technologies: string[]
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    technologies: [{ type: String }],
  },
  { timestamps: true }
)

const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema)

export default Experience
