/**
 * Section 5.1 - Student model (studentDB)
 */
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true, collection: "students" }
);

module.exports = mongoose.model("Student", studentSchema);
