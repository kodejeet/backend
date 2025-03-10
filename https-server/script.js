//  most famous tool to create https server is express 
// to understand the core basics we can build a server on C from scratch 

 

const express = require('express') // importing express js and its modules (npm install express)
const app = express(); // creating an express application/instance that handles req and res
const port = 3000 // setting the server port/address tp 3000
 
app.get('/', function(req, res)  { //defining a route for the root url "/"
  res.send('Hello, World! wohoo'); // sending a response when someone visits "/"
});



app.listen(port)
