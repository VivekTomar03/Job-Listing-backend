const jwt = require('jsonwebtoken');
const { Company } = require('../modal/company');
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        // console.log(token)
        const decodedToken = jwt.verify(token, process.env.COMPANY_Token);
        // console.log(decodedToken)
        const company= await Company.findById(decodedToken.userId);
        
        if (!company) {
            throw new Error();
        }

        
        req.body.comID =decodedToken.userId
        req.body.companyName = company.companyname
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed.middleware' });
    }
};
