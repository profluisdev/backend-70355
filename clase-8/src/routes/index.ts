
import { Router } from "express";
import taskRoutes from "./task.routes"

const router = Router();

router.use("/task", taskRoutes); // /api/task

export default router;