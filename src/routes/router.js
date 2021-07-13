// npm packages ...
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
	body,
	validationResult
} = require('express-validator');
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
router.get('/signup', (req, res) => {
	res.render('signup');
});

// signup post routes ...
router.post('/signup',
	body('username').not().isEmpty().trim().escape(),
	body('email', 'email address is invalid').isEmail().normalizeEmail(),
	body('password', 'password must be 5 char long').isLength({
		min: 5
	}),
	(req, res) => {

		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {

			const alerts = errors.array();
			res.render('signup', {
				Alerts: alerts[0].msg
			});

		} else {

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

						res.status(201).redirect('/user/login');
					} else {
						res.status(201).send('password didn`t matched');
					}

				} catch(error) {
					res.status(400).send(error);
				}
			};
			createDocument();
		}

	});


// login route ...
router.get('/user/login', (req, res) => {
	res.render('login');
});

// login post routes ...
router.post('/login',
	body('email', 'email address is invalid').isEmail().normalizeEmail(),
	body('password', 'password must be 5 char long').isLength({
		min: 5
	}),
	async (req, res) => {
		try {

			// Finds the validation errors in this request and wraps them in an object with handy functions
			const errors = validationResult(req);
			if (!errors.isEmpty()) {

				const alerts = errors.array();
				res.render('login', {
					Alerts: alerts[0].msg
				});

			} else {

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
					httpOnly: true,
					// secure: true
				});

				if (isMatch) {
					res.status(201).redirect(`/user/${userData._id}`);
				} else {
					res.send('password didnt matched');
				}
			}

		} catch (error) {
			res.status(400).send('invalid login details');
			console.log(`login error occured => ${error}`);
		}
	});

// root user auth route ...
router.get('/user/:id', auth, async (req, res) => {
	try {

		const doc = await User.findOne({
			_id: req.params.id
		});

		res.status(200).render('root', {
			id: doc._id,
			doc: doc.urls
		});

	} catch (error) {
		res.status(500).send(error);
	}
});

// root page post route ...
router.post('/userpost', async (req, res) => {
	try {
		const obj = JSON.parse(JSON.stringify(req.body));
		const doc = await User.findOne({
			_id: obj.id
		});

		User.updateOne(
			{
				_id: doc._id
			},
			{
				$addToSet: {
					urls: [{
						fullurl: req.body.short
					}]
				}
			}, {
				new: true, upsert: true
			}).exec();

		res.redirect(`/user/${doc._id}`);

	} catch (error) {
		res.status(500).send(error);
	}
});

// logout routes ...
router.get('/logout', auth, async (req, res) => {
	try {

		// removing cookie from database
		req.user.tokens = req.user.tokens.filter((currentToken) => {
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
router.get('/logoutall', auth, async (req, res) => {
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