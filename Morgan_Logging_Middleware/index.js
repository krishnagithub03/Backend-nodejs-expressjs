import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(morgan("combined"));

app.get("/",(req,res)=>{
    res.send("<h1>Hello World!</h1>");
});
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})