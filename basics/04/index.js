// building a REST API from scratch 

const express = require("express");
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 1111;

// routes


// for web-view
app.get('/api/users', function (req, res) {
        return res.json(users);
    });

app.get("/users", (req, res) => {
        const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
        `;
        res.send(html);
    });

// access through dynamic path 

// efficient way of multiple https method routing 

app
    .route("/api/users/:id")
    .get((req,  res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // edit user with id 
        res.json({status: "pending"});
    })
    .delete((req, res) => {
        // delete user with id 
        res.json({status: "pending"});
    })
    // .patch((req, res) => {})




app.post("/api/users", (req,  res) => {
    // create new user 
    return res.json({status: "pending"});
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));