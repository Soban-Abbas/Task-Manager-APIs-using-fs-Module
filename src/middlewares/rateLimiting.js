const requestCounts = {};
// Custom rate limiter middleware
exports.rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 1, lastRequest: now };
    } else {
        const timeSinceLastRequest = now - requestCounts[ip].lastRequest;
        const timeLimit = 15 * 1000; // 15 sec

        if (timeSinceLastRequest < timeLimit) {
            requestCounts[ip].count += 1;
        } else {
            requestCounts[ip] = { count: 1, lastRequest: now }; // Reset ager req 15 sec kay bad aye 
        }
    }

    const maxRequests = 6;

    if (requestCounts[ip].count > maxRequests) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    requestCounts[ip].lastRequest = now;
    next();
};
