exports.inputValidations=function(req,res,next){

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if(!regex.test(req.body.dueDate)){
      return  res.status(400).json({
            message:"Enter valid date fomate"
        })
    }


const title=req.body.title;
const status=req.body.status;
const priority=req.body.priority;
const dueDate=req.body.dueDate;
if(!title || !status  || !priority || !dueDate){
   return res.status(400).json({
        message:"Enter Valid Inputs "
    })
}
next();
}