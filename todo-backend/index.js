const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Todo = require("./todo")
const cors = require("cors")
mongoose.connect("mongodb+srv://alpitsonawane:alpit2001@cluster0.a6klssc.mongodb.net/mongoDB").then((result) => console.log("connected to database")).catch((err) => console.log(err))

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    const pendingTodos = Todo.find({}).then((result) => res.json(result)).catch((err) => console.log(err))

})

app.put("/addTodo", (req, res) => {
    const todo = new Todo({
        content: req.body.content,
        completed: req.body.completed
    })
    todo.save().then((result) => console.log("saved")).catch((err) => console.log(err))
    res.send("todo saved succefully")

})
app.delete("/deleteTodo", (req, res) => {
    console.log(req.body._id)
    Todo.deleteOne({ _id: req.body._id }).then((result) => console.log(result)).catch((e) => console.log(e))
    // Todo.deleteMany({}).then((result) => console.log(result)).catch((err) => console.log(err))
    res.send("succeffull").json({ deleted: "deleted" })
    console.log(req.body._id)
})



app.listen(5000, () => console.log("connected to server"))
