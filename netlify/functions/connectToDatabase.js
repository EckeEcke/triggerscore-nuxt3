import { connectToDatabase } from "./dbClient.js"

export const handler = async () => {
  try {
    const database = await connectToDatabase()
    const scores = database.collection('scores')
    const query = { id: '3' }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to database' }),
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type', 
        'Access-Control-Allow-Credentials': 'true', 
    }, 
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type', 
        'Access-Control-Allow-Credentials': 'true', 
    }, 
    }
  }
}
