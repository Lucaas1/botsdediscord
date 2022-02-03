const express = require('express');
const config = require('../config/config.json');
const getStaff = require('../utils/functions.js');
const bot = require('../bot/bot.js');
const router = express.Router();

router.get('/', async (req, res) => {
	await getStaff(req, bot, config);
	const bots = await bot.db.get('bots');
	res.render('index', {
		bot: bot,
		bots: bots,
		user: req.session.passport?.user || null,
	});
});

router.get('/@me', async (req, res) => {
	await getStaff(req, bot, config);
	res.render('@me', {
		bot: bot,
		user: req.session.passport?.user || null,
	});
});

router.get('/bots', async (req, res) => {
	await getStaff(req, bot, config);
	const bots = await bot.db.get('bots');
	res.render('bots', {
		bot: bot,
		bots: bots,
		user: req.session.passport?.user || null,
	});
});

router.get('/login', async function(req, res) {
	res.redirect('/api/callback');
});

router.get('/logout', async function(req, res) {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
});


module.exports = router;