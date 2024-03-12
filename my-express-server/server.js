import express  from "express";
const app = express();
const port = 3000;

app.get("/",function(request,response){
    // console.log(request);
    response.send("<h1>HELLO,World</h1>");
});

app.get("/contact",function(req,res){
    res.send("contact me at : agrawalkrishna030@gmail.com");
});

app.get("/about",function(req,res){
    res.send("<em>Hi! My name is Krishna Agrawal a Computer Science Major at KIET Group Of intitutions</em>");
});

app.get("/hobbies",function(req,res){
    res.send("<ul><li>Code</li><li>Pizza</li></ul>");
});

app.listen(port, function(){
    console.log(`server has started on port ${port}`);
});