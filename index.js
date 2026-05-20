/**
 * Final Examination - Full Stack Web Development
 * Single server | Port 3000 | http module + Express + MongoDB
 */
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./config/db.js");
const Student = require("./models/student.model.js");
const studentsDummyRoute = require("./routes/studentsDummy.route.js");

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Browser routes
app.get("/", (req, res) => res.send("Welcome to Node.js Server"));
app.get("/about", (req, res) => res.send("About Page"));
app.get("/contact", (req, res) => res.send("Contact Page"));
app.get("/services", (req, res) => res.send("Services Page"));

// MongoDB - add student
app.post("/add-student", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || age === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, email, and age are required",
      });
    }
    const student = await Student.create({ name, email, age: Number(age) });
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// MongoDB - list all students
app.get("/students-db", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Dummy JSON - GET/POST/PUT/DELETE /students
app.use(studentsDummyRoute);

// 404
app.use((req, res) => res.status(404).send("404 Page Not Found"));

// Section 1 - server created with built-in http module
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
