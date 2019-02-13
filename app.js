const path = require('path');
const controller = require('./controllers/kocController');

const express = require('express'),
	bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/get-results', controller.formCalc);	

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname + '/public/keeporcancel.html'));
});

app.use((req, res, next) => {
	res.status(404);
	res.send('Error 404, location not found');
});

app.listen(3000);
