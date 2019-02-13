const app = require('express');

exports.formCalc = (req, res, next) => {
	//grab all values from the form body:

	const valueUR = parseFloat(req.body.valueUR);
	const spendTravel = parseFloat(req.body.spendTravel);
	const spendDining = parseFloat(req.body.spendDining);
	const spendEE = parseFloat(req.body.spendEE);
	const valueCredit = parseFloat(req.body.valueCredit);
	const valuePP = parseFloat(req.body.valuePP);
	const valueInsurance = parseFloat(req.body.valueInsurance);

	//Use CFU logic:
	let pointsEE;

	if (req.body.useCFU) {
		pointsEE = spendEE * 1.5;
	} else {
		pointsEE = spendEE;
	}

	//calculate points earned:
	let points3X = 3 * (spendTravel + spendDining);

	//logic to calculate points & dollars earned from spending
	let totalPointsEarned = points3X + pointsEE;
	let totalPointsValue = (totalPointsEarned * valueUR) / 100;

	// Calculation of Verdict:
    let result = totalPointsValue + valueCredit + valuePP + valueInsurance - 450;
    console.log(result);
};
