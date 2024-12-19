const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Create Student
app.post('/students', async (req, res) => {
  try {
    const { name, cohort, course, status } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        course,
        status,
      },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All Students
app.get('/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Student
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cohort, course, status } = req.body;
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { name, cohort, course, status },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Student
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
