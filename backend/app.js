const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001
const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')

const url = 'mongodb+srv://devagiri:kolathara1@devagiri.52w6g.mongodb.net/?retryWrites=true&w=majority&appName=Devagiri'
const dbName = 'Exam'
let db

// Add body parser middleware
app.use(express.json())
app.use(cors())

MongoClient.connect(url)
  .then(async client => {
    console.log('Connected to MongoDB')
    db = client.db(dbName)
    
    app.post('/addtask', async(req, res) => {
        try{
          // Use data from request body instead of hardcoded values
          const task = req.body
          const result = await db.collection('tasks').insertOne(task);
          res.send({message: 'Task created successfully'})
        }
        catch(err){
          console.error('Error creating task:', err)
          res.status(500).send({message: 'Error creating task', error: err.message})
        }
    })

    app.get('/tasks', async(req, res) => {
        try{
            const response = await db.collection('tasks').find({}).toArray();
            console.log(response)
            res.send(response).status(200)
        }
        catch(err){
            console.log(err)
            res.status(500).send({message: `Some Error occured ${err}`})
        }
    })
    
    app.listen(PORT, () => {
      console.log(`Server live on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})