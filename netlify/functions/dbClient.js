import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = `mongodb+srv://ceckardt254:${process.env.DATABASE_PASSWORD}@cluster0.sen83.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
let client

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db('triggerscore')
}
