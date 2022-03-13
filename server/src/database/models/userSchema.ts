import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    discordId: { type: String, required: true },
    alias: { type: String, required: false },
});

export default model("User", UserSchema);
