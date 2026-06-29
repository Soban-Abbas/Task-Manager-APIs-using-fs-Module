exports.updateInputValidation=(req,res,next)=>{
    if(req.body.dueDate===undefined){
       return next();
    }
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(req.body.dueDate)) {
        return res.status(400).json({
            message: "Enter valid date fomate"
        })
    }
next()
}