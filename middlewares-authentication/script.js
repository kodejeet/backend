const express = require("express");

const app = express();

app.get("/health-checkup", function(req, res){
    const username = req.headers.username;
    const password = req.headers.password;

    if (username === "anon404" && password ==="pass"){
        // do something with kidney here 
        res.json({
            msg: "Your Kindney is fine."
        })
    }
});