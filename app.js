const express=require('express');
const app=express();

const bodyParser=require("body-parser");
const taskRoutes=require("./src/routes/taskRoutes")
const {globalErrorMiddleware}=require("./src/middlewares/globalErrorMiddleware")
app.use(bodyParser.json())


app.use(taskRoutes)


app.use(globalErrorMiddleware);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



