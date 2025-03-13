// building a REST API from scratch 

const express = require("express");
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 1111;

// routes

app.get('/users', function (req, res) {
        return res.json(users);
    });

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));