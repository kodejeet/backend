const express = require("express");
let users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 1111;

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/xyz-app-1")
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  jobTitle: { type: String },
  gender: { type: String },
  },
{timestamps: true});

const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST route
app.post("/api/users", async (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const result = await User.create({
      firstName: first_name,
      lastName: last_name,
      email: email,
      gender: gender,
      jobTitle: job_title,
    });

    console.log("result", result);
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create user", details: error });
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
