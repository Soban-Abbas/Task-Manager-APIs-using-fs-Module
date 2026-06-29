const express=require("express");
const router=express.Router();
const taskControllers=require("../controllers/taskController")
const { inputValidations }=require("../middlewares/inputValidaton")
const { updateInputValidation }=require('../middlewares/updateInputeValidation')
router.post("/api/tasks",inputValidations,taskControllers.postTask)
router.get("/api/tasks/",taskControllers.getAllTasks)
router.get("/api/tasks/:taskId", taskControllers.getTaskById)
router.put("/api/tasks/:taskId",updateInputValidation, taskControllers.updateTaskbyId);
router.delete("/api/tasks/:taskId", taskControllers.deleteTask);

module.exports=router;