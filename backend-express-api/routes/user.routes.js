const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const config = require('../db/config');

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', function (err) {
    console.log('Connection open with MONGOdb Server!');
});
db.on('error', function (err) {
    console.log("Error : " + err.stack);
});

// GET/ api /users/register
router.get('/register', (req, res, next) => {
    res.send('Register');
})

//post/ api/users/register

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    //calling fn from user.model.js file

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register'
            });
        }
        else {
            res.json({
                success: true,
                msg: 'User is Registered'
            });
        }
    });
});


router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    //calling from user.model.js file
    User.getUsersByUserName(email, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                success: false,
                msg: 'User not found'
            })


        //calling from user.model.js file
        User.comparePassword(password, user.password,
            (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {

                    const token = jwt.sign(user.toObject(), config.secret, { expiresIn: 604800 })

                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email

                        }
                    })
                }
                else {
                    return res.json({
                        success: false,
                        msg: 'Wrong Password'
                    })
                }
            })
    })
})

//GET /api/
router.get('/profile',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ user: req.user });
    })

//exporting routes
module.exports = router;