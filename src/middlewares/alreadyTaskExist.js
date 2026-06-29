const fs = require("fs");
const path = require("path");
exports.TaskExist = (req, res, next) => {
    try {
        const database = path.join(__dirname, "../../database.json");

        fs.readFile(database, "utf8", (err, data) => {
            if (data) {
                const AllTasks = JSON.parse(data);
                const taskExist = AllTasks.find((t) => {
                    if ((t.title).trim() === (req.body.title).trim() && (t.description).trim() === (req.body.discription).trim())
                        return res.status(409).json({
                            message: "Task Already exists"

                        })

                })
                if(!taskExist){
                   return next();
                }

            }
            else{
                
            }
        })
    } catch (error) {
        next(error)
    }
}