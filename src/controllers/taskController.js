const fs=require("fs")
const path=require("path")
const taskModel = require("../models/taskModel")
const dataBase=path.join(__dirname,"../../database.json");
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
        }else{
            let storingArray=[];
            storingArray.push(createNewTask);
            fs.writeFile(dataBase,JSON.stringify(storingArray),(err)=>{
                res.status(201).json({
                    message:"Task Added Successfully",
                    data:{
                        ...createNewTask
                    }
                })
            })
        }
        
   
    })



} catch (error) {
    error.status=500;
    error.message="DataBase Problem Occur"
    next(error)
}


    


}