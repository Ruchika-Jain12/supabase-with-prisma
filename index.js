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

app.post('/university', async (req, res) => {
  const { name, location } = req.body

  try {
    const newUniversity = await prisma.university.create({
      data: {
        name,
        location
      }
    })

    res.status(201).json(newUniversity)
  } catch (error) {
    console.error('Error creating university:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/students', async (req, res) => {
  const { name, address, phoneno, email, gender, universityId } = req.body
  try {
    const newStudent = await prisma.students.create({
      data: { name, address, phoneno, email, gender, universityId }
    })
    res.status(201).json(newStudent)
  } catch (error) {
    console.error('Error creating student:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/students/:id', async (req, res) => {
  const { id } = req.params
  try {
    const student = await prisma.students.findUnique({
      where: { id: parseInt(id) },
      include: { University: true }
    })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(201).json(student)
  } catch (error) {
    console.error('Error retrieving student:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
