const express = require('express');
const app = express()
const port = 3000


app.get('/',(req,res)=>{
    res.send("hello wold!")
})

let users=[
    {id:1,name:"Alice",email:"alice@example.com"},
    {id:2,name:"Bob",email:"bob@example.com"},
    {id:3,name:"Charlie",email:"charlie@example.com"},
    {id:4,name:"David",email:"david@example.com"},
];

//get all users
app.get("/users",(req,res)=>{
    res.send(users);
})  

//get one particular data -> dynamic routing
app.get("/users/:id",(req,res)=>{
    const id = Number(req.params.id);

    const user= users.find((user)=>user.id === id);
    
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.json(user);
})

// create user

app.post("/user",(req,res)=>{
    const {title} = req.body

    if (!title){
        return res.json({
            message: " ",

        });
    }

    const newUser ={
        id: users.length + 1,
        title: title,
        completed: false,
    };

    users.push(newUser);
    res.status(201).jason({
        message: "User created sucessfully",
        todo: newUser,
    });

});




app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

