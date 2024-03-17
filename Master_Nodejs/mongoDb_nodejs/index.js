const express = require('express');
const app = express();
// const users = require('./MOCK_DATA.json') ab ye db se leke ana h
const port = 8000;

const mongoose = require('mongoose');
const fs = require('fs');

//connection
mongoose.connect('mongodb://127.0.0.1:27017/krish-codes').then(()=>
    console.log('MongoDB Connected')).catch(err => console.log("Mongo Error",err));

//Schema
const userSchema = new mongoose.Schema({
   firstName:{
    type: String,
    required: true,
   },
   lastName:{
    type: String,
    required: false,
   },
   email:{
    type: String,
    required: true,
    unique: true,
   },
   gender:{
    type: String,
    required: false,
   },
   jobTitle:{
    type: String,
    required: true,
   },

},{timestamps : true});

const User = mongoose.model("user",userSchema);





//middleware
app.use(express.urlencoded({extended: false}));

// app.use((req,res,next)=>{
//     console.log("Hello from MiddleWare");
//     return res.json({msg: "Hello from middleware"});
// });
// user routes tk pacuch nhi paa rha tha 

app.use((req,res,next)=>{
    // console.log("Hello from MiddleWare 1");
    req.myUsername = "Krishna";
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.method} ${req.path}`,(err,data)=>{
        next();
    });
});

app.use((req,res,next)=>{
    console.log("Hello from MiddleWare 2",req.myUsername);
    // return res.end("Hello");
    next();
});



//routes
app.get('/users',async (req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
//REST API
app.get('/api/users',async (req,res)=>{
    const allDbUsers = await User.find({});
    // console.log("I am in GET route",req.myUsername);
    // res.setHeader("X-myName","Krishna");
    // good practice to add X to your custom hearders
    return res.json(allDbUsers);
});


// dynamic path parameters

// app.get('/api/users/:id',(req,res) =>{
//     const  id = Number(req.params.id);
//     const user = users.find(user=> user.id === id);

//     res.json(user);
// });

//create a new user using POST

app.post('/api/users',async (req,res)=>{
    const body = req.body;
    if(!body || !body.first_name||!body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are required"});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log("result", result);

    return res.status(201).json({msg:"success"});



    // console.log(body);
    //hume ye nhi krna ab jab mongodb h toh
    // users.push({...body,id:users.length+1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     return res.status(201).json({status : "Success", id: users.length});
    // });
});

// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status : "Pending"});
    
// })

// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status : "Pending"});  
// });


// I can also group these
app.route('/api/users/:id').get(async (req,res) =>{
    const user = await User.findById(req.params.id);



    // const  id = Number(req.params.id);
    // const user = users.find(user=> user.id === id);
     if(!user) return res.status(404).json({msg: "User not found"}); 
    return res.json(user);
}).patch(async (req,res)=>{

    await User.findByIdAndUpdate(req.params.id, {lastName : "changed"});
    // const id = Number(req.params.id);
    // const user  = users.find(user=> user.id === id);

    // const body = req.body;
    // user.first_name = body.first_name;
    // user.last_name = body.last_name;
    // user.email = body.email;
    // user.gender = body.gender;
    // user.job_title = body.job_title;
    // fs.writeFile('/MOCK_DATA.json',JSON.stringify(users),(err,data) =>{
    //     return res.json({status : "Success"});
    // })


    return res.status(200).json({msg: "Success"});

}).delete(async (req,res)=>{
    // const id = Number(req.params.id);
    // const user  = users.findIndex(user=> user.id === id);

    await User.findByIdAndDelete(req.params.id);

    // const delUser = users.splice(user,1)[0];
    // fs.writeFile('/MOCK_DATA.json',JSON.stringify(user),(err,data)=>{
    //     return res.json({status : "Success"});
    // });

    return res.status(200).json({msg: "Success"});
});

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})
