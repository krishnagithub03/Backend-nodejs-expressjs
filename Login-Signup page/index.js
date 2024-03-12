import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit",(req,res)=>{
    let username = req.body["name"];  //getting the value of input field with id="name" and storing it in variable 'name'
    let pass = req.body["password"];

    console.log("username :" + username);
    console.log("password :" + pass);

    res.render("index.ejs",
  {
    userName : username,
    code : pass,
  });
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})