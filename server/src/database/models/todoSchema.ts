import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    createdDate: { type: Date, required: true },
    dueDate: Date,
    completed: { type: Boolean, required: true },
    priority: { type: String, required: true },
});

export default model("Todo", TodoSchema);
