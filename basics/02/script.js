//  http methods 
//  get post put delete


// https server without express js 

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) =>{
    if(req.url==='/favicon.ico') return res.end();

    const myUrl = url.parse(req.url, true);
    console.log(myUrl); 

    

     const log = `${Date.now()}: ${req.url} New Request Received\n`;   
    fs.appendFile("log.txt", log, (err,data) => {
      
        // multi route using switch case 
        switch(myUrl.pathname){
            case "/": 
            if(req.method=== "GET") res.end("HomePage");
            break;
            case '/about':
            
            const username = myUrl.query.myname;
            res.end(`Hi, ${username}`);
            break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end('Here are your results for hahahah :' +search);
                break;
            case "/signup" :
                if(req.method==="GET") {
                    res.end("This is a Signup Form");
                }
                else if(req.method==="POST"){
                    // db query
                res.end("Sucess");
            }
            break;
            default:
                res.end("404 Not Found")
        }
    });     // non-blocking req
    
    // res.end("Hello From Server");
});

myServer.listen(8000, ()=> console.log("Server Started"));

//  we can send the whole html too thats called server side rendering