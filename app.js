const path = require('path');
const controller = require('./controllers/kocController');

const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	helmet = require('helmet'),
	rateLimit = require('express-rate-limit'),
	compression = require('compression');

require('dotenv').config();

const app = express();

app.use(helmet());
app.enable('trust proxy');
app.use(compression());

const submitLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000,
	max: 30,
	message: 'Too many submissions, IPs are capped at 30 submissions per day.',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.post('/get-results', submitLimiter, controller.formCalc);

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname + '/public/keeporcancel.html'));
});

app.use((req, res, next) => {
	res.status(404);
	res.send('Error 404, location not found');
});

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(process.env.PORT || 3000);
	})
	.catch((err) => {
		console.log(err);
	});
