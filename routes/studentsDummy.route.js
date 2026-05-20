/**
 * Section 3 - Dummy students API (in-memory JSON)
 */
const express = require("express");
const router = express.Router();

let students = [
  { id: 1, name: "Karim", email: "karim@gmail.com", age: 21 },
  { id: 2, name: "Fatima", email: "fatima@gmail.com", age: 20 },
];

let nextId = 3;

router.get("/students", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All students fetched successfully",
    data: students,
  });
});

router.post("/students", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, email, and age are required",
    });
  }

  const newStudent = { id: nextId++, name, email, age: Number(age) };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student added successfully",
    data: newStudent,
  });
});

router.put("/students", (req, res) => {
  const id = Number(req.body.id ?? req.query.id);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student id is required",
    });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const { name, email, age } = req.body;
  if (name) students[index].name = name;
  if (email) students[index].email = email;
  if (age !== undefined) students[index].age = Number(age);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[index],
  });
});

router.delete("/students", (req, res) => {
  const id = Number(req.body.id ?? req.query.id);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student id is required",
    });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deleted,
  });
});

module.exports = router;
