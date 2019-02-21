const path = require('path');
const controller = require('./controllers/kocController');

const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	helmet = require('helmet'),
	rateLimit = require('express-rate-limit');

require('dotenv').config()

const app = express();

app.use(helmet());

// app.use(helmet({
// 	contentSecurityPolicy: {
// 		directives: {
// 			defaultSrc: ["'self'"],
// 			scriptSrc: ["'self'", 'salty-lake-23071.herokuapp.com', "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com', 'stackpath.bootstrapcdn.com'],
// 			styleSrc: ["'self'", 'salty-lake-23071.herokuapp.com', "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com','stackpath.bootstrapcdn.com', 'fonts.googleapis.com' ],
// 			fontSrc: ["'self'", 'salty-lake-23071.herokuapp.com', 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
// 			imgSrc: ["'self'", 'salty-lake-23071.herokuapp.com', 's3-us-west-2.amazonaws.com' ]
// 		}
// 	}
// }));

app.enable('trust proxy');

const submitLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000,
	max: 30,
	message: 
	"Too many submissions, IPs are capped at 30 submissions per day."
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
	.connect(
		process.env.DB_CONNECT, { useNewUrlParser: true }
	)
	.then(() => {
		console.log('Connected to the database successfully!');
		app.listen(process.env.PORT || 3000);
	})
	.catch(() => console.log('error connecting to dB'));
