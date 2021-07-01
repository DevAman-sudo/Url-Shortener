const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id : verifyUser._id });
        
        req.token = token;
        req.user = user;
        
        next();

    } catch (error) {
        res.status(400).render('login.hbs' , {'message' : 'user must login first'});
    }
};

module.exports = auth;