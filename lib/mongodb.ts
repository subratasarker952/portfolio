import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
  isConnected: boolean
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null, isConnected: false }

if (!global.mongoose) {
  global.mongoose = cached
}

export function isMongoDBConfigured(): boolean {
  return !!MONGODB_URI && MONGODB_URI.length > 0
}

async function dbConnect(): Promise<typeof mongoose | null> {
  // If no MongoDB URI is configured, return null
  if (!MONGODB_URI) {
    console.log('MongoDB URI not configured - using sample data')
    return null
  }

  if (cached.conn && cached.isConnected) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      cached.isConnected = true
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
    cached.isConnected = true
  } catch (e) {
    cached.promise = null
    cached.isConnected = false
    console.log('MongoDB connection failed - using sample data')
    return null
  }

  return cached.conn
}

export default dbConnect
