// npm packages ...
const express = require('express');
const router = express();

// index route ...
router.get('/' , async (req , res) => {
    res.status(200).send('hello world');
});

module.exports = router;