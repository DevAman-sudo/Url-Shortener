// npm packages ...
const express = require('express');
const path = require('path');
const Shortner = require('../models/schema');
const router = express();
router.set('views', path.join(__dirname, '../../templates/views'));

// index route ...
router.get('/', async (req, res) => {

    const shortUrls = await Shortner.find();
    res.status(200).render('index', {
        shortUrls: shortUrls,
        timer: '59 m'
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