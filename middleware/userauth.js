const jwt = require('jsonwebtoken');
const { JOB } = require('../modal/job');
const { User } = require('../modal/user');
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)
        const company= await User.findById(decodedToken.userId);
        console.log(company)
        if (!company) {
            throw new Error();
        }
        req.user = company;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed.middleware userauth' });
    }
};
