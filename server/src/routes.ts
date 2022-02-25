import { Router } from "express";
import Todo from "./models/Todo";

const router: Router = Router();

// GET: Retrieve all Todos
router.get("/todo", async (_req, res) => {
    try {
        const todo = await Todo.find();
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error retrieving Todos" });
    }
});

// POST: Create new Todo
router.post("/todo", async (req, res) => {
    try {
        const todo = new Todo({ ...req.body });
        await todo.save();
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error creating Todo" });
    }
});

// DELETE: Delete a Todo
router.delete("/todo/:id", async (req, res) => {
    try {
        const deleted = await Todo.findOneAndDelete({ _id: req.params.id });
        res.status(204).send(deleted);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error deleting Todo" });
    }
});

// PATCH: Update a Todo
router.patch("/todo/:id", async (req, res) => {
    try {
        console.log("running patch");
        console.log(req.params.id);
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, { name: "hello, i changed" });
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error updating Todo" });
    }
});

module.exports = router;
