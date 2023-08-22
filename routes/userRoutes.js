const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../modal/user');


require("dotenv").config()
router.post('/register', async (req, res) => {
    try {
        const {username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({ email, password: hashedPassword , username});
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!!!!! not reister user now try again.' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token , message:"User Login successfully!!!" , name:user.username,usertype:"user"});
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong!!!!! not login user now try again.' });
        
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userid= req.params.id;
        const singaluser = await User.findById(userid);

        if (!singaluser) {
            return res.status(404).json({ message: 'singaluser not found.' });
        }

        res.status(200).json(singaluser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user ' });
    }
})



module.exports = router;