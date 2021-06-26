// npm packages ...
const mongoose = require('mongoose');
const shortid = require('shortid');

const shortner = new mongoose.Schema({
    fullurl: {
        type: String,
        required: true
    },
    shorturl: {
        type: String,
        required: true,
        default: shortid.generate
    }
});


shortner.index({createdAt: 1},{expireAfterSeconds: 3600});

module.exports = mongoose.model('Shortner' , shortner);