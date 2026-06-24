const express=require("express");
const router=express.Router();
const taskControllers=require("../controllers/taskController")
router.post("/api/tasks",taskControllers.postTask)

module.exports=router;