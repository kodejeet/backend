// https server without express js 

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) =>{
    if(req.url==='/favicon.ico') return res.end();

    const myUrl = url.parse(req.url, true);
    console.log(myUrl); 

    //console.log("New Req Received");    ----1
    // console.log(req.headers);          ----2
    // console.log(req);                  ----3

     const log = `${Date.now()}: ${req.url} New Request Received\n`;   
    fs.appendFile("log.txt", log, (err,data) => {
        // res.end("Hello From Server");
        // multi route using switch case 
        switch(myUrl.pathname){
            case '/': 
            res.end("HomePage");
            break;
            case '/about':
                // res.end("I am Anon404");
            const username = myUrl.query.myname;
            res.end(`Hi, ${username}`);
            break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end('Here are your results for :' +search);
                break;

            default:
                res.end("404 Not Found")
        }
    });     // non-blocking req
    
    // res.end("Hello From Server");
});

myServer.listen(8000, ()=> console.log("Server Started"));

//  we can send the whole html too thats called server side rendering