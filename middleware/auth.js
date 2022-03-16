const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"] || req.headers["x-auth-token"];
        if (!token) {
            res.status(401).json({ message: "Please Sign In" });
        }
        else {
            const decodedToken = jwt.verify(token, process.env.JWT_secret_token);
            req.user = decodedToken;
            next();

        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Please Sign In" });
    }
}