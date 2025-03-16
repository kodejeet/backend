const express = require("express");
let users = require("./MOCK_DATA.json");
const app = express();
const PORT = 1111;
const fs = require("fs");

// middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.route("/api/users/:id");
app.post("/api/users", (req, res) => {
  // create new user
  const { id, ...body } = req.body;
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
    return res.status(201).json({ status: "success", id: newId });
  });
});
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
