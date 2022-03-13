import { Router } from "express";
import Todo from "./database/models/todoSchema";

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

// GET: Retrive todo by <id>
router.get("/todo/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.send(todo);
    } catch {
        res.status(404).send({ error: "Todo with this id does not exist!" });
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
        res.send(deleted);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error deleting Todo" });
    }
});

// PATCH: Update a Todo
router.patch("/todo/:id", async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            {
                returnOriginal: false,
            }
        );
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error updating Todo" });
    }
});

export default router;
