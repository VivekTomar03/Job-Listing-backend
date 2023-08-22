const express = require('express');
const companyRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company } = require('../modal/company');


companyRouter.post('/register', async (req, res) => {
    try {
        const {username, email, password, companyname } = req.body;

        const existingUser = await Company.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new Company({ email, password: hashedPassword , username, companyname});
        await newUser.save();

        res.status(201).json({ message: 'Comapny registered successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!!!!! not reister comapny now try again.' });
    }
});
companyRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const isPasswordValid = await bcrypt.compare(password, company.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const token = jwt.sign({ userId: company._id , companyName:company.companyname}, process.env.COMPANY_Token, { expiresIn: '1h' });
        res.status(200).json({ token , message:"Company Login successfully!!!" , name:company.companyname , usertype:"company"});
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!!!!! not login user now try again.' });
        
    }
});


module.exports = companyRouter;