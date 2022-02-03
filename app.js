require('colors');
const config = require('./config/config.json');
const PORT = process.env.PORT || config.port;
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');
const { Strategy } = require('passport-discord');

const path = require('path');

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SessionStore = require('express-session-level')(session);
const db = require('level')('./sessions');

app.use(session({
	secret: config.server.secret,
	saveUninitialized: false,
	resave: false,
	store: new SessionStore(db),
}));

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new Strategy({
	clientID: config.discord.clientID,
	clientSecret: config.discord.clientSecret,
	callbackURL: config.discord.callbackURL,
	prompt: config.oauth2.prompt,
	scope: config.oauth2.scopes,
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		return done(null, profile);
	});
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routers/index'));
app.use('/api', require('./routers/api'));
app.use('/bots', require('./routers/bots'));

app.listen(PORT, () => {
	require('./bot/bot.js');
	console.log(`[SERVER] Listening on port ${config.port}`.green);
});