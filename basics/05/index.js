const express = require("express");
let users = require("./MOCK_DATA.json");
const app = express();
const mongoose = require("mongoose");
const PORT = 1111;
// connection
mongoose
.connect('mongodb://127.0.0.1:27017/xyz-app-1')
.then(() => console.log('Mongo DB Connected'))
.catch(err => console.log('Mongo Error', err))
// Schema 
const userSchema = new mongoose.Schema({
  firstNamae: {
    type: String,
    required: true,
  },
  lastNamae: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});
const User = mongoose.model('user', userSchema);
const fs = require("fs");
const { cursorTo } = require("readline");

// middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.route("/api/users/:id");
app.post("/api/users", (req, res) => {
  // create new user
  const { id, ...body } = req.body;
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  const newId = id ?? users.length + 1;
  if (users.some((user) => user.id === newId)) {
    return res.status(400).json({ error: "User with this ID already exists" });
  }
  const newUser = { id: newId, ...body };
  users.push(newUser);
  fs.writeFile("././MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add user" });
    }
    return res.status(202).json({ status: "success", id: newId });
  });
});
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));