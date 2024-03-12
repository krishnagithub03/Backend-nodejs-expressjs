const express  = require('express');
const app = express();
const port =  8000;

app.get('/',(req,res) =>{
    return res.send("Hello from Krishna");
});

app.get('/about',(req,res) =>{
    return res.send(`U wanna know about me Hey, this is ${req.query.name}`);
});

// app.post('/submit',(req,res)=>{
//     res
// })

app.listen(port,()=>{
    console.log(`listening at ${port}`);
});



