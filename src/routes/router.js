// npm packages ...
const express = require('express');
const path = require('path');
const router = express();
router.set('views', path.join(__dirname , '../../templates/views') );

// index route ...
router.get('/' , async (req , res) => {
    res.status(200).render('index');
});

// index shortner post route ...
router.post('/shortner' , async (req , res) => {
    try {
        
        console.log(req.body.short);
        res.redirect('/');
        
    } catch (error) {
        res.status(500).send(`shortner route error => ${error}`);
    }
});

module.exports = router;