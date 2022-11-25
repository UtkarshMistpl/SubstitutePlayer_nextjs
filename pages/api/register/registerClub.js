import { reach } from "yup";
import { connectToDatabase } from "../../../lib/db";
const clubController = require("../controller/clubController");

// import Player from "../../../models/playerModel";
import Client from "../config/db";

export default async function register(req, res) {
	console.log("connecting");

	await Client();
	console.log("connected");
	switch (req.method) {
		case "POST":
			let newPost = await clubController.createClub(req.body);
			if (newPost) return res.status(200).json({ message: "Success" });
			else return res.status(422).json({ message: "Failed" });
		case "GET":
			const posts = await clubController.getClubs();
			if (posts) return res.json({ status: 200, data: posts });
			else return res.json({ status: 200, data: "no data " });
	}
}
