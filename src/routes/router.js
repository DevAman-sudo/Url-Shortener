// npm packages ...
const express = require('express');
const path = require('path');
const Shortner = require('../models/schema');
const router = express();
router.set('views', path.join(__dirname , '../../templates/views') );

// index route ...
router.get('/' , async (req , res) => {
    
    const shortUrls = await Shortner.find();
    res.status(200).render('index' , {shortUrls : shortUrls});
});

// index shortner post route ...
router.post('/shortner' , async (req , res) => {
    try {
        
        await Shortner.create({
            fullurl: req.body.short
        });
        res.redirect('/');
        
    } catch (error) {
        res.status(500).send(`shortner route error => ${error}`);
    }
});

module.exports = router;