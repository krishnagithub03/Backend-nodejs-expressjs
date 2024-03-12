import express from "express";

const app = express();
const port = 3000;

app.use((req,res,next)=>{
    console.log("Request Method :",req.method);
    next(); // going to next app.use
});
app.use((req,res,next)=>{
    console.log("URL :",req.url);
    next(); // going to next app.use
});
app.use((req,res,next)=>{
    console.log("Request status :",req.status);
    next(); // going to next app.use
});
app.use((req,res,next)=>{
    console.log("Response time :",Date.now());
    next(); // going to next app.use
});


app.get("/",(req,res)=>{
    res.send("<h1>Welcome to my website</h1>");
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})