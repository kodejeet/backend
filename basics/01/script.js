const fs = require("fs");
const os = require('os');

console.log(os.cpus().length);

// sync...
// fs.writeFileSync("./log.txt", "Hello World");

// async...
// fs.writeFile("./log.txt", "Hello World", (err) => {});
// both works the same 

// console.log("1");

// blocking... sycnhronus 
const result = fs.readFileSync("log.txt", "utf-8");
// console.log(result);


// non blocking... asynchronus 
fs.readFile("log.txt", "utf-8", (err, result) =>{
    //  console.log(result);

 });

// console.log("2");
// console.log("3");
// console.log("4");

// prints accordingly when blocking statement

// prints the async func at the end after printing all of it 


// default thread pool size = 4
// max threads= 12 core cpu means 12 threads

// morale - always write code thats non blocking 