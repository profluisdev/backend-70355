import { Router } from "express";
import taskDao from "../dao/task.dao";
import { Task } from "../interfaces/task";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await taskDao.getAll();

    res.status(200).json({ status: "ok", payload: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskDao.getOne({ _id: id });

    res.status(200).json({ status: "ok", payload: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { task } = req.body as Task;
    console.log(req.body.task.task);
    
    const newTask = await taskDao.create( {task: req.body.task.task} );

    res.status(200).json({ status: "ok", payload: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await taskDao.getAll();

    res.status(200).json({ status: "ok", payload: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskDao.update(id, { done: true});

    res.status(200).json({ status: "ok", payload: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskDao.remove(id);

    res.status(200).json({ status: "ok", payload: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
