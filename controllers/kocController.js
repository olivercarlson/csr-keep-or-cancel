const Verdict = require('../models/verdict');

exports.formCalc = (req, res, next) => {
	
	//grab and sanitize all values from the request body:

	const valueUR = parseFloat(req.body.valueUR),
		spendTravel = parseFloat(req.body.spendTravel),
		spendDining = parseFloat(req.body.spendDining),
		spendEE = parseFloat(req.body.spendEE),
		valueCredit = parseFloat(req.body.valueCredit),
		valuePP = parseFloat(req.body.valuePP),
		valueInsurance = parseFloat(req.body.valueInsurance),
		usingCFU = (req.body.useCFU) ? 'Yes' : 'No';

	// wipe request after grabbing required input values.
	req = null;

	//Calculate pointsEE based on whether or not CFU is used.
	let pointsEE = (usingCFU === 'Yes') ? spendEE * 1.5 : spendEE;

	//calculate points earned with CSR:
	let points3X = 3 * (spendTravel + spendDining);

	//Calculate total points & dollars earned from spending
	let totalPointsEarned = points3X + pointsEE;
	let totalPointsValue = (totalPointsEarned * valueUR) / 100;

	// Calculate total CSR value:
	let csrValue = parseFloat(
		(
			totalPointsValue +
			valueCredit +
			valuePP +
			valueInsurance -
			450
		).toFixed(2)
	);

	// calculate what the return of using a 2% no AF cashback card would equate to (i.e a replacement level card)
	let replacementSpend = spendTravel + spendDining + spendEE;
	let replacementCardValue = parseFloat((replacementSpend * 0.02).toFixed(2));

	//Determine Verdict. Note that $50 is arbitrarily determined as a reasonable gauge to how much you should come out ahead for paying the fee.
	let keepCSR;
	(csrValue > replacementCardValue + 50) ? keepCSR = true : keepCSR = false;

	//create new entry in mongo (via mongoose) to store info.
	const verdict = new Verdict({
		valueUR: valueUR,
		spendTravel: spendTravel,
		spendDining: spendDining,
		usingCFU: usingCFU,
		spendEE: spendEE,
		valueCredit: valueCredit,
		valuePP: valuePP,
		valueInsurance: valueInsurance,
		pointsEE: pointsEE,
		points3X: points3X,
		totalPointsEarned: totalPointsEarned,
		totalPointsValue: totalPointsValue,
		replacementCardValue: replacementCardValue,
		keepCSR: keepCSR,
		csrValue: csrValue,
	});

	//save results to mongo, spin up templated EJS page.
	verdict
		.save()
		.then(() => {
			res.render('results', {
				verdict: verdict,
				pageTitle: 'Results',
				path: 'results',
			});
		})
		.catch(() => {
			res.status(404);
			res.send('Error 404: Unable to generate Results Page');
});
};