import express from "express";

const app = express();
const port = 3000;

//custom middleware 
function logger(req,res,next){
  console.log("request method",req.method);
  console.log("request url",req.url);
  next(); // importand otherwie it will be hanging
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
