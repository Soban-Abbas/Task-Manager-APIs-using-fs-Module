const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const taskRoutes=require("./src/routes/taskRoutes")
const {globalErrorMiddleware}=require("./src/middlewares/globalErrorMiddleware")
app.use(bodyParser.json())
const requestCounts = {};

// Custom rate limiter middleware
const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 1, lastRequest: now };
    } else {
        const timeSinceLastRequest = now - requestCounts[ip].lastRequest;
        const timeLimit = 15  * 1000; // 15 sec

        if (timeSinceLastRequest < timeLimit) {
            requestCounts[ip].count += 1;
        } else {
            requestCounts[ip] = { count: 1, lastRequest: now }; // Reset after time window
        }
    }

    const maxRequests = 3;

    if (requestCounts[ip].count > maxRequests) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    requestCounts[ip].lastRequest = now;
    next();
};

app.use(rateLimiter)
app.use(taskRoutes)


app.use(globalErrorMiddleware);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



