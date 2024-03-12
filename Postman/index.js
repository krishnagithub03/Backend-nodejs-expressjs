import express from "express";
const app = express();
const port = 3000;
// get
app.get("/",(req,res)=>{
    res.send("Hello World");
})

//post 
app.post("/register",(req,res)=>{
    res.sendStatus(201);
});
//put
app.put("/user/krish",(req,res)=>{
    res.sendStatus(200);
});
//patch
app.patch("/user/krish",(req,res)=>{
    //updating user info
    res.sendStatus(200);
});
//delete
app.delete("/user/krish",(req,res)=>{
    //deleting user
    res.sendStatus(200);
});

app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})