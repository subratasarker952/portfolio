import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITestimonial extends Document {
  clientName: string
  review: string
  company: string
  avatar?: string
  rating: number
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    review: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
)

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)

export default Testimonial
