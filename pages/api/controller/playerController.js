const Player = require("../models/playerModel");

const mongoose = require("mongoose");

// get all workouts
const getPlayers = async (req, res) => {
	const user_id = req.user._id;

	const players = await Player.find({ user_id }).sort({ createdAt: -1 });

	res.status(200).json(players);
};

// get a single workout
const getPlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" });
	}

	const player = await Player.findById(id);

	if (!player) {
		return res.status(404).json({ error: "No such workout" });
	}

	res.status(200).json(player);
};

// create new workout
const createPlayer = async (bodyObject) => {
	// const { title, load, reps } = req.body;

	let emptyFields = [];

	// if (!title) {
	// 	emptyFields.push("title");
	// }
	// if (!load) {
	// 	emptyFields.push("load");
	// }
	// if (!reps) {
	// 	emptyFields.push("reps");
	// }
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all the fields", emptyFields });
	}

	// add doc to db
	try {
		// const user_id = req.user._id;
		const player = await Player.create(bodyObject);
		console.log(player);
		return player;
	} catch (error) {
		console.log(error.message);
		return { error: error.message };
	}
};

// delete a workout
const deletePlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" });
	}

	const player = await Player.findOneAndDelete({ _id: id });

	if (!player) {
		return res.status(400).json({ error: "No such workout" });
	}

	res.status(200).json(player);
};

// update a workout
const updatePlayer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout" });
	}

	const player = await Player.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!player) {
		return res.status(400).json({ error: "No such workout" });
	}

	res.status(200).json(player);
};

module.exports = {
	getPlayers,
	getPlayer,
	createPlayer,
	deletePlayer,
	updatePlayer,
};
