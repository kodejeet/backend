// express js basics 

// without using multiroute switch case we can directly do it with the help of express js
// just declare the path and the response we want to send 
// therefore the code looks clean and short &precise 
// basically everything comes in built in rather than doing it from scratch

const http = require("http");
const fs = require("fs");
const url = require("url");

const express = require("express");

const app = express();

app.get('/', (req,res)=>{
    return res.send("Hello from Home Page"); 
});

app.get('/about', (req,res)=>{
    // return res.send("Hello from About Page " + "hey" + " " +req.query.name);
    return res.send(`Hello ${req.query.name}`) 
});

app.listen(8000, () => console.log("Server Started") )
