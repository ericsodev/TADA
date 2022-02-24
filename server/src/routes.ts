import { Router } from "express";
import Todo from "./models/Todo";

const router: Router = Router();

// GET: Retrieve all Todos
router.get("/todo", async (_req, res) => {
    const posts = await Todo.find();
    res.send(posts);
});

// POST: Create new Todo
router.post("/todo", async (req, res) => {
    try {
        const todo = new Todo({ ...req.body });
        await todo.save();
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error creating post" });
    }
});

module.exports = router;
