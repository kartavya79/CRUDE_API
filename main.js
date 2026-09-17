const express = require('express');
const app = express()
const port = 3000
app.use(express.json());

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
            message: "Title is required ",

        });
    }

    const newUser ={
        id: users.length + 1,
        title: title,
        completed: false,
    };


    users.push(newUser);
    res.status(201).json({
        message: "User created sucessfully",
        todo: newUser,
    });

});

// update todo
app.put("/user/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    user.title = title;
  }

  if (completed !== undefined) {
    user.completed = completed;
  }

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

// DELETE todo
app.delete("/user/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((todo) => todo.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.json({
    message: "User deleted successfully",
    todo: deletedUser[0],
  });
});




app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

