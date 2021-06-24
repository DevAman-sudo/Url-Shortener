// npm packages ...
const express = require('express');
const path = require('path');
const router = express();
router.set('views', path.join(__dirname , '../../templates/views') );

// index route ...
router.get('/' , async (req , res) => {
    res.status(200).render('index');
});

module.exports = router;