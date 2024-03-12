const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({entended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

// app.get("/bmicalculator",function(req,res){
//   res.sendFile(__dirname+"/bmiCalculator.html");
// });

app.post("/",function(req,res){
// console.log(req.body);
var num1 = Number(req.body.n1);
var num2 = Number(req.body.n2);
var ans = num1+num2;

res.send("The Result of calculation is "+ans);
});

// app.post("/",function(req,res){

//   var w = Number(req.body.weight);
//   var h = Number(req.body.height);

//   var result = (w/(h*h))*10000;

//   res.send("Your BMI is "+result);

// })

app.listen(3000, function(){
  console.log("Server has started at localhost:3000");
});
