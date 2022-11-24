const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		days: {
			type: Array,
			required: true,
		},
		sports: {
			type: Array,
			required: true,
		},
		skill: {
			type: String,
			required: true,
		},
		_from: {
			type: String,
			required: true,
		},
		_to: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.players || mongoose.model("players", playerSchema);
