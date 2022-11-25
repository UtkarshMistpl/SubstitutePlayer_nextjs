// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Client from "./config/db";

const clubController = require("./controller/clubController");

// import Player from "../../../models/playerModel";
export default async function handler(req, res) {
	console.log("connecting");
	await Client();
	console.log("connected");
	const posts = await clubController.getClubs();
	if (posts) res.json({ status: 200, data: posts });
	else res.json({ status: 200, data: "no data " });
}
