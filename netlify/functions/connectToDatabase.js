import { connectToDatabase } from "./dbClient.js"

export const handler = async () => {
  try {
    const database = await connectToDatabase()
    const scores = database.collection('scores')
    const query = { id: '3' }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to database' })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
