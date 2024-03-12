const http = require('http');

const fs = require('fs');

const myServer = http.createServer((req,res) =>{
    // console.log(req.headers);
    const log = `${Date.now()} ${req.method}: ${req.url} New Req. Recieved \n`;
    fs.appendFile('./log.txt',log, (err,data) =>{
        switch(req.url){
            case '/' : 
            if(req.method ==+ "GET")
            res.end("Homepage");
            break;
            case '/about' : res.end("Hello from Krishna");
            break;
            case '/signup' : 
            if(req.method === "GET")
            res.end("this is a signup form");
            else if(req.method === "POST"){
                // db query
            res.end("success");
            }
            break;
            default:
                res.end("404 not Found");
        }
    });
});

myServer.listen(8000
, ()=> console.log("Server Started at port 8000"));


// GET == to get data from server
// POST : to give data to server and mutate to db
// PUT : to put data to server(Upload img)
// PATHCH: to update existing data (edit profile)
// DELETE : to delete data from server