// https server without express js 

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) =>{
    //console.log("New Req Received");    ----1
    // console.log(req.headers);          ----2
    // console.log(req);                  ----3

     const log = `${Date.now()}: ${req.url} New Request Received\n`;   
    fs.appendFile("log.txt", log, (err,data) => {
        // res.end("Hello From Server");
        // multi route using switch case 
        switch(req.url){
            case '/': res.end("HomePage");
            break
            case '/about': res.end("I am Anon404");
            break;
            default:
                res.end("404 Not Found")
        }
    });     // non-blocking req
    
    // res.end("Hello From Server");
});

myServer.listen(8000, ()=> console.log("Server Started"));

//  we can send the whole html too thats called server side rendering