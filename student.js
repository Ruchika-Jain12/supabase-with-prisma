const express = require('express')
// const { prismaClient, Prisma } = require('@prisma/client')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Ruchi')
})

app.post('/students', async (req, res) => {
  const { name, address, phoneno, email, gender, universityId } = req.body
  try {
    const newStudent = await prisma.studentscreate({
      data: { name, address, phoneno, email, gender, universityId }
    })
    res.status(201).json(newStudent)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
