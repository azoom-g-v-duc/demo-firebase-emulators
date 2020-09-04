const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.get('/users', async (req, res) => {
  const users = await User.getUsers()
  res.send({ users })
})

app.post('/users', async (req, res) => {
  const user = req.body
  const createdUser = await User.createUser(user)
  res.send(createdUser)
})

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log(`Server is running at port ${process.env.PORT || 8080}`)
})
