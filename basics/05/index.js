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

// get route 

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
            ${allDbUsers
              .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
              .join("")}
        </ul>
        `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
    // get single user by id 
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  });

  app.route("/api/users/:id")
    .get(async (req, res) => {
      // get single user by id 
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({error: "user not found"});
      return res.json(user);
    })
    .patch(async (req, res) => {
        // edit user with id
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
        return res.json({status: "Success"});
      })
    .delete(async (req, res) => {
        // delete user with id
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: "Success"});
      });

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
