const express = require("express");

const app = express();

app.get("/health-checkup", function(req, res){
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyKid;

    if (username != "anon404" || password !="pass"){
        res.status(400).json({"msg" : "Something up with your inputs"})
        return
    }
    if(kidneyId != 1 && kidneyId != 2){
        res.status(400).json({"msg" : "Something up with your inputs"})
        return
    }
    // do something with kidney here
    
    res.json({
        msg: "Your Kidney is fine."
    })
        
    // res.status(400).json({"msg" : "Something up with your inputs"})
});

app.listen(3000);