import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISkill extends Document {
  name: string
  icon: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other'
  proficiency: number
  createdAt: Date
  updatedAt: Date
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    icon: { type: String, default: '' },
    category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'], required: true, },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
  },
  { timestamps: true }
)

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)

export default Skill
