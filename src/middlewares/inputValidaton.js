exports.inputValidations=function(req,res,next){
    if (req.body.title === undefined || req.body.discription === undefined || req.body.status === undefined || req.body.priority === undefined || req.body.dueDate === undefined) {
        return res.status(422).json({
            message: "Enter valid Inputs "
        })
    }
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!regex.test(req.body.dueDate)){
      return  res.status(400).json({
            message:"Enter valid date fomate"
        })
    }

  

const title=(req.body.title).trim();
const description=(req.body.discription).trim();
const status=req.body.status;
const priority=req.body.priority;
const dueDate=req.body.dueDate;
if(!title || !description || !status  || !priority || !dueDate){
   return res.status(400).json({
        message:"Enter Valid Inputs "
    })
}
next();
}