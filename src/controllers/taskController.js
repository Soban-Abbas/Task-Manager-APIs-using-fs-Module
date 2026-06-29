const fs = require("fs")
const path = require("path")
const taskModel = require("../models/taskModel")
const dataBase = path.join(__dirname, "../../database.json");
exports.postTask = async (req, res, next) => {

    try {
        let title = req.body.title;
        let discription = req.body.discription;
        let priority = req.body.priority;
        let status = req.body.status;
        let dueDate = req.body.dueDate;
        let createNewTask = new taskModel(title, discription, priority, status, dueDate);

        fs.readFile(dataBase, "utf8", (err, data) => {
            if (data) {
                let allData = JSON.parse(data)
                allData.push(createNewTask);
                fs.writeFile(dataBase, JSON.stringify(allData), (err) => {
                    if (!err) {
                        res.status(201).json({
                            message: "New Task Created successfully",
                            data: {
                                ...createNewTask
                            }
                        })
                    }
                })
            } else {
                let storingArray = [];
                storingArray.push(createNewTask);
                fs.writeFile(dataBase, JSON.stringify(storingArray), (err) => {
                    res.status(201).json({
                        message: "Task Added Successfully",
                        data: {
                            ...createNewTask
                        }
                    })
                })
            }


        })



    } catch (error) {
        error.status = 500;
        error.message = "DataBase Problem Occur"
        next(error)
    }





}

exports.getAllTasks = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = 3;
        const status = req.query.status;
        const sort = req.query.sort;
        fs.readFile(dataBase, "utf-8", (err, data) => {
            if (data) {
                const allTasks = JSON.parse(data)
                if (status) {
                    const statusArray = allTasks.filter((t) => {
                        return t.status === status
                    })
                    return res.status(200).json({
                        message: `Successfully Fetched all ${status} tasks `,
                        data: statusArray
                    })
                } else if (sort) {
                    if (sort === "asc") {
                        const ascSort = allTasks.sort((a, b) => {
                            return new Date(a.dueDate) - new Date(b.dueDate)
                        })
                        return res.status(200).json({
                            message: "Successfully fetched Data in Ascending Order",
                            data: ascSort
                        })

                    } else {
                        const descSort = allTasks.sort((a, b) => {
                            return new Date(b.dueDate) - new Date(a.dueDate)
                        })
                        return res.status(200).json({
                            message: "Successfully fetched Data in descending Order",
                            data: descSort
                        })

                    }
                } else {
                    let startIndex = (page - 1) * limit;
                    let endIndex = startIndex + limit;
                    let copyOriginalTasks = [...allTasks];
                    let pagination = copyOriginalTasks.slice(startIndex, endIndex);
                    if (pagination.length === 0) {
                        return res.status(404).json({
                            message: `Tasks  not  found for page ${page}`
                        })
                    }
                    res.status(200).json({
                        message: `Items for page ${page} fetched Successfully`,
                        data: [pagination]
                    })
                }




            }
        })

    } catch (error) {
        next(error)
    }

}

exports.getTaskById = async (req, res, next) => {
    console.log(req.params.taskId)
    try {
        fs.readFile(dataBase, "utf8", (err, data) => {
            if (data) {
                const allTasks = JSON.parse(data);
                const task = allTasks.find((t) => {
                    return t.id === Number(req.params.taskId)
                })
                if (task) {
                    res.status(200).json({
                        message: `data fetch successfully for Id ${req.params.taskId}`,
                        data: task
                    })
                } else {
                    res.status(404).json({
                        message: `Id ${req.params.taskId} Not exist`
                    })
                }
            } else {
                res.status(404).json({
                    message: "Error With DataBase"
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.updateTaskbyId = async (req, res, next) => {
    try {
        fs.readFile(dataBase, "utf8", (err, data) => {
            if (data) {
                const allTasks = JSON.parse(data);
                const copyAllTask = [...allTasks];
                const task = copyAllTask.find((t) => {
                    return t.id === Number(req.params.taskId)
                })
                if(!task){
                   return res.status(404).json({
                        message:`Id ${req.params.taskId} Not exist `
                    })
                }
                const taskIndex = copyAllTask.findIndex((t) => {
                    return t.id === Number(req.params.taskId)
                })

                task.id = task.id;
                task.title = req.body.title || task.title
                task.description = req.body.description || task.description
                task.status = req.body.status || task.status
                task.priority = req.body.priority || task.priority
                task.dueDate = req.body.priority || task.priority
                task.createdAt = task.createdAt
                task.updatedAt = new Date().toISOString();


                copyAllTask[taskIndex]=task
            
fs.writeFile(dataBase,JSON.stringify(copyAllTask),(err)=>{
    if(!err){
      return   res.status(200).json({
            message:"Task updated Successfully",
            data:task
        })
    }
})




            }else{
               return res.status(500).join({
                    message:"Error with Database"
                })
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteTask=async(req,res,next)=>{
    try {
        fs.readFile(dataBase,"utf8",(err,data)=>{
            if(data){
const AllTasks=JSON.parse(data);
const  copyAllTasks=[...AllTasks];
const findIndexofTask=copyAllTasks.findIndex((t)=>{
    return t.id===Number(req.params.taskId);

})
if(findIndexofTask<0){
  return  res.status(404).json({
        message:"Id Not Exist"
    })

}

copyAllTasks.splice(findIndexofTask,1);
fs.writeFile(dataBase,JSON.stringify(copyAllTasks),(err)=>{
 if(!err){
     return res.status(200).json({
         message: "Task Deleted Successfully",

     })
 }
})





            }else{
                return res.status(404).json({
                    message:"Error with DataBase"
                })
            }
        })
    } catch (error) {
        next(error)
    }
}