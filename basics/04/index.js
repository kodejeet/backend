// building a REST API from scratch

const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 1111;

const fs = require("fs");

// middleware plugin
app.use(express.urlencoded({ extended: false }));

// routes

// for web-view
app.get("/api/users", function (req, res) {
  return res.json(users);
});

app.get("/users", (req, res) => {
  // this route responses as html instead of json 
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
        `;
  res.send(html);
});

// access through dynamic path

// efficient way of multiple https method routing


// efficient routing ---> no need to define routing again and again
app.route("/api/users/:id")
  .get((req, res) => {
    // get single user by id 
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // edit user with id
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update user" });
      }
      return res.json({ status: "success", user: users[userIndex] });
    });
  })
  .delete((req, res) => {
    // delete user with id
    const id = Number(req.params.id);
    // deleted the user if it matches the condition
    const filteredUsers = users.filter((user) => user.id !== id);

    if (filteredUsers.length === users.length) {
      return res.status(404).json({ error: "User not found" });
    }

    users = filteredUsers;

    // 2 here is used for identation (line spacing in json text)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete user" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });
// .patch((req, res) => {})

app.post("/api/users", (req, res) => {
  // create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("././MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length});
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
