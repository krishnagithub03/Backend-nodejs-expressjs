const http = require('http');

const fs = require('fs');

const myServer = http.createServer((req,res) =>{
    // console.log(req.headers);
    const log = `${Date.now()} : ${req.url} New Req. Recieved \n`;
    fs.appendFile('./log.txt',log, (err,data) =>{
        switch(req.url){
            case '/' : res.end("Homepage");
            break;
            case '/about' : res.end("Hello from Krishna");
            break;
            default:
                res.end("404 not Found");
        }
    });
});

myServer.listen(8000
, ()=> console.log("Server Started at port 8000"));