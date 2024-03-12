const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json')
const port = 8000;

const fs = require('fs');

//middleware
app.use(express.urlencoded({extended: false}));
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
    console.log(body);
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status : "Success", id: users.length});
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
