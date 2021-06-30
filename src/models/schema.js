// npm packages ...
const mongoose = require('mongoose');
const shortid = require('shortid');
const ttl = require('mongoose-ttl');

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
    shortner.plugin(ttl, { ttl: 3600000, reap: false });

    module.exports = mongoose.model('Shortner', shortner);