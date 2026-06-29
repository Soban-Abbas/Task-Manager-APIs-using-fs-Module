const express=require("express");
const router=express.Router();
const taskControllers=require("../controllers/taskController")
router.post("/api/tasks",taskControllers.postTask)
router.get("/api/tasks/",taskControllers.getAllTasks)
router.get("/api/tasks/:taskId", taskControllers.getTaskById)

module.exports=router;