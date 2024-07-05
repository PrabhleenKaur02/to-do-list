const express = require("express");
const cors = require("cors");
const pool = require('./db');

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// ROUTES

// create todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.status(200).json({
            msg: "Todo successfully added",
            data: newTodo
        });

    } catch (error) {
        console.error(error.message)
    }
})

// get all todos
app.get("/todos", async(req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos.rows);

    } catch (error) {
        console.error(err.message)
    }
})

// get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);

    } catch (error) {
        console.error(err.message)
    }
})

// update todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo successfully updated!");

    } catch (error) {
        console.error(err.message)
    }
})

// delete todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo deleted");

    } catch (error) {
        console.error(err.message)
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
