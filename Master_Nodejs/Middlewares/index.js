const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json')
const port = 8000;

const fs = require('fs');

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
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
//REST API
app.get('/api/users',(req,res)=>{
    console.log("I am in GET route",req.myUsername);
    res.setHeader("X-myName","Krishna");
    // good practice to add X to your custom hearders
    return res.json(users);
});


// dynamic path parameters

// app.get('/api/users/:id',(req,res) =>{
//     const  id = Number(req.params.id);
//     const user = users.find(user=> user.id === id);

//     res.json(user);
// });

//create a new user using POST

app.post('/api/users',(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name||!body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are required"});
    }
    console.log(body);
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status : "Success", id: users.length});
    });
});

// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status : "Pending"});
    
// })

// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status : "Pending"});  
// });


// I can also group these
app.route('/api/users/:id').get((req,res) =>{
    const  id = Number(req.params.id);
    const user = users.find(user=> user.id === id);
     if(!user) return res.status(404).json({msg: "User not found"}); 
    return res.json(user);
}).patch((req,res)=>{
    const id = Number(req.params.id);
    const user  = users.find(user=> user.id === id);

    const body = req.body;
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.gender = body.gender;
    user.job_title = body.job_title;
    fs.writeFile('/MOCK_DATA.json',JSON.stringify(users),(err,data) =>{
        return res.json({status : "Success"});
    })
}).delete((req,res)=>{
    const id = Number(req.params.id);
    const user  = users.findIndex(user=> user.id === id);

    const delUser = users.splice(user,1)[0];
    fs.writeFile('/MOCK_DATA.json',JSON.stringify(user),(err,data)=>{
        return res.json({status : "Success"});
    });
});

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})
