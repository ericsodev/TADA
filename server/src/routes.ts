import { Router } from "express";
import { userInfo } from "os";
import Todo from "./database/models/todoSchema";
import User from "./database/models/userSchema";

const router: Router = Router();

// GET: Retrieve all Todos
router.get("/todo", async (req, res) => {
    try {
        if (!req.body.userId) res.status(400).send({ error: "User ID required to get Todos" });

        const todo = await Todo.find({ userId: req.body.userId });
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error retrieving Todos" });
    }
});

// GET: Retrive todo by <id>
router.get("/todo/:id", async (req, res) => {
    try {
        if (!req.body.userId) res.status(400).send({ error: "User ID required to get Todo. Are you logged in?" });

        const todo = await Todo.find({ _id: req.params.id, userId: req.body.userId });
        res.send(todo);
    } catch {
        res.status(404).send({ error: "Todo with this id does not exist!" });
    }
});

// POST: Create new Todo
router.post("/todo", async (req, res) => {
    try {
        if (!req.body.userId) res.status(400).send({ error: "User ID required to create Todo" });

        // Verify this user exists
        const user = await User.findOne({ userId: req.body.userId });
        if (user === null) res.status(400).send({ error: "The provided User ID does not exist" });

        // Create and save Todo
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
        if (!req.body.userId) res.status(400).send({ error: "User ID required to create Todo" });

        // Verify this user exists
        const user = await User.findOne({ userId: req.body.userId });
        if (user === null) res.status(400).send({ error: "The provided User ID does not exist" });

        // Delete Todo, then return the deleted Todo
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
        if (!req.body.userId) res.status(400).send({ error: "User ID required to create Todo" });

        // Verify this user exists
        const user = await User.findOne({ userId: req.body.userId });
        if (user === null) res.status(400).send({ error: "The provided User ID does not exist" });

        // Update and return new Todo
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.body.userId },
            { ...req.body },
            { returnOriginal: false }
        );
        res.send(todo);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Error updating Todo" });
    }
});

export default router;
