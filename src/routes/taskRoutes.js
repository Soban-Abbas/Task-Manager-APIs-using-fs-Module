const express=require("express");
const router=express.Router();
const taskControllers=require("../controllers/taskController")
const { inputValidations }=require("../middlewares/inputValidaton")
const { updateInputValidation }=require('../middlewares/updateInputeValidation')
const { rateLimiter }=require("../middlewares/rateLimiting");
const { TaskExist }=require("../middlewares/alreadyTaskExist")
router.post("/api/tasks", TaskExist,inputValidations,taskControllers.postTask)
router.get("/api/tasks/",rateLimiter,taskControllers.getAllTasks)
router.get("/api/tasks/:taskId", rateLimiter,taskControllers.getTaskById)
router.put("/api/tasks/:taskId",updateInputValidation, taskControllers.updateTaskbyId);
router.delete("/api/tasks/:taskId", taskControllers.deleteTask);

module.exports=router;