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

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));