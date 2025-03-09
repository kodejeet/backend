// https server without express js 

const http = require("http");

const myServer = http.createServer((req, res) =>{
    //console.log("New Req Received");    ----1
    // console.log(req.headers);          ----2
    console.log(req);
    res.end("Hello From Server");
});

myServer.listen(8000, ()=> console.log("Server Started"));