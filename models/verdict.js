const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const verdictSchema = new Schema({
	valueUR: {
		type: Number,
		required: true,
	},
	spendTravel: {
		type: Number,
		required: true,
	},
	spendDining: {
		type: Number,
		required: true,
	},
	spendEE: {
		type: Number,
		required: true,
	},
	valueCredit: {
		type: Number,
		required: true,
	},
	valuePP: {
		type: Number,
		required: true,
	},
	valueInsurance: {
		type: Number,
		required: true,
	},
	pointsEE: {
		type: Number,
		required: true,
    },
    usingCFU: {
        type: String,
        required: true,
    },
	points3X: {
		type: Number,
		required: true,
	},
	totalPointsEarned: {
		type: Number,
		required: true,
	},
	totalPointsValue: {
		type: Number,
		required: true,
	},
	replacementCardValue: {
		type: Number,
		required: true,
	},
	keepCSR: {
		type: Boolean,
		required: true,
	},
	csrValue: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Verdict', verdictSchema);
