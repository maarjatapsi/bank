const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Account = require('../models/Account');
const { check,validationResult } = require('express-validator');
const e = require('express');


//gets back all the users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({message:err})
    }
});

//registers an user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (e) {
        res.statusCode = 400
        //res.json({message: err });
        res.json({error: e.message});
    }
});

//get specific user
router.get('/:userId', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
    
});


module.exports = router;