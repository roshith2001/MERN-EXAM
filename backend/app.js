const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')

const url = ''
const dbName = 'Exam'
let db

// Add body parser middleware
app.use(express.json())
app.use(cors())

MongoClient.connect(url)
  .then(async client => {
    console.log('Connected to MongoDB')
    db = client.db(dbName)
    
    
    
    app.listen(PORT, () => {
      console.log(`Server live on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})