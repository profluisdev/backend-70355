import mongoose from "mongoose";
import { Task } from "../interfaces/task";

const taskCollection = "tasks";

const taskSchema = new mongoose.Schema<Task>({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

export const taskModel = mongoose.model(taskCollection, taskSchema);