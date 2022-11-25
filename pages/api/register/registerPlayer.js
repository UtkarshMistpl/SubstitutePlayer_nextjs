import { connectToDatabase } from "../../../lib/db";
import Player from "../models/playerModel";
const playerController = require("../controller/playerController");
import Client from "../config/db";

export default async function registerPlayer(req, res) {
	console.log("connecting");

	await Client();
	console.log("connected");
	if (req.method == "POST") {
		// let bodyObject = JSON.parse(req.body);
		console.log(req.body);
		let newPost = await playerController.createPlayer(req.body);
		if (newPost) return res.status(200).json({ message: "Success" });
		else return res.status(422).json({ message: "Failed" });
		// return res.status(200).json({ message: "Success" });
	} else if (req.method == "GET") {
		const posts = await db.collection("players").find({}).toArray();
		res.json({ status: 200, data: posts });
	}
}
