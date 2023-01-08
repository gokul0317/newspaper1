const jwt = require("jsonwebtoken");

const createToken = (data) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(data, jwtSecret);
    return token;
}

const verifyToken = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const token = req.header("Authorization");
        if (!token) {
            res.status(401).json({ message: "Token missing", errors: "Failed to process request" });
            return;
        }
        const isTokenValid = jwt.verify(token, jwtSecret);
        if (isTokenValid) {
            const parsedToken = jwt.decode(token);
            req.user = parsedToken._id;
            next();
        }
    } catch(e) {
        console.log(e, "Error in token")
        res.status(500).json({ message: "Invalid token", errors: "Failed to process request" });
    }
}

module.exports = {
    createToken,
    verifyToken
}