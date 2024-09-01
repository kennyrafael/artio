import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseConfig {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: MongooseConfig = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('Missing MONGODB_URI')

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'api-service',
      bufferCommands: false,
    })

  cached.conn = await cached.promise
  return cached.conn
}
