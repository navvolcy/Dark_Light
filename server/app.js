const express = require('express')
const cors = require("cors")


const app = express()
const port = 8080
app.use(cors())



app.get('/courses', (req, res) => {
    const courses = require('../db.json')
    res.json(courses)
  })

app.get('/logs', (req, res) => {
  const logs = require('../db.json')
  res.json(logs)
})

app.post('/logs',(req, res) => {
  const newLogs = requiure('../db.json')
  res.send(newLogs)
} )


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})