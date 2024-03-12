const http = require('http');
const url = require('url');
const fs = require('fs');

const myServer = http.createServer((req,res) =>{
    // console.log(req.headers);
    if(req.url === "/favicon.ico") return res.end();
    const log = `\n${Date.now()} : ${req.url} New Req. Recieved`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile('./log.txt',log, (err,data) =>{
        switch(myUrl.pathname){
            case '/' : 
                res.end("Homepage");
                break;
            case '/about' : 
                const userName = myUrl.query.myname;
                res.end(`hello ${userName}`);
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("here is my search" + search);
                break;
            default:
                res.end("404 not Found");
        }
    });
});

myServer.listen(8000
, ()=> console.log("Server Started at port 8000"));