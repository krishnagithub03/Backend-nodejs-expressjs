import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    itemList = [];
    res.render("index.ejs");
});

app.post("/submit",(req,res)=>{
    const input = req.body["task"];
    itemList.push(input);
    console.log(input);
    console.log(itemList);
    res.render("index.ejs",
    {
        item : itemList,
    }
    );
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});


var itemList = [];