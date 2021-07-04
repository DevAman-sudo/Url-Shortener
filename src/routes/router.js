// npm packages ...
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Shortner = require('../models/schema');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express();
router.set('views', path.join(__dirname, '../../templates/views'));

// index route ...
router.get('/', async (req, res) => {

    const shortUrls = await Shortner.find();
    res.status(200).render('index', {
        shortUrls: shortUrls,
    });
});

// index shortner post route ...
router.post('/shortner', async (req, res) => {
    try {

        await Shortner.create({
            fullurl: req.body.short
        });
        res.redirect('/');

    } catch (error) {
        res.status(500).send(`shortner route error => ${error}`);
    }
});

// signup route ...
router.get('/signup' , (req , res) => {
    res.render('signup');
});

// signup post routes ...
router.post('/signup', (req, res) => {

    const createDocument = async () => {
        try {
            const Password = req.body.password;
            const Confirm_password = req.body.confirm_password;

            if (Password == Confirm_password) {
                const registerUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    pass: req.body.password,
                    password: Password,
                    confirm_password: Confirm_password
                });

                const registered = await registerUser.save();

                res.status(201).redirect('/auth/login');
            } else {
                res.status(201).send('password didn`t matched');
            }

        } catch(error) {
            res.status(400).send(error);
        }
    };
    createDocument();

});


// login route ...
router.get('/user/login' , (req , res) => {
    res.render('login');
});

// login post routes ...
router.post('/login', async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({
            email: email
        });

        // comparing hashed password with user password
        const isMatch = await bcrypt.compare(password, userData.password);

        // JWT auth tokens
        const token = await userData.generateAuthToken();

        // storing user cookie
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
            // secure: true
        });

        if (isMatch) {
            res.status(201).redirect(`/user/${userData._id}`);
        } else {
            res.send('password didnt matched');
        }

    } catch (error) {
        res.status(400).send('invalid login details');
        console.log(`error occured => ${error}`);
    }
});

// root user auth route ...
router.get('/user/:id' , auth , async (req , res) => {
    try {

        const id = await User.findOne({ _id: req.params.id });
        console.log(id.username);

        res.status(200).render('root');
        
    } catch (error) {
        res.status(500).send(error);
    }
});

// logout routes ...
router.get('/logout' , auth , async (req , res) => {
    try {
        
        // removing cookie from database
        req.user.tokens = req.user.tokens.filter( (currentToken) => {
            return currentToken.token !== req.token;
        });
        
        // removing cookie from client machine
        res.clearCookie("jwt");
        await req.user.save();
        res.redirect('/user/login');
        
    } catch (error) {
        res.status(500).send(`logout route error => ${error}`);
    }
});

// logout routes ...
router.get('/logoutall' , auth , async (req , res) => {
    try {
        
        // logout from all devices
        req.user.tokens = [];
        
        // removing cookie from client machine
        res.clearCookie("jwt");
        await req.user.save();
        res.redirect('/user/login');
        
    } catch (error) {
        res.status(500).send(`logout route error => ${error}`);
    }
});

// 404 error route ...
router.get('*', (req, res) => {
    res.render('error');
});

// short id index route ...
router.get('/:id', async (req, res) => {
    try {

        const shortId = await Shortner.findOne({
            shorturl: req.params.id
        });
        res.redirect(Shortner.fullurl);

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;