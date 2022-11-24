import { reach } from "yup";
import { connectToDatabase } from "../../../lib/db";
// import Player from "../../../models/playerModel";
import Client from "../config/db";

export default async function handler(req, res) {
	const client = await connectToDatabase;
	const db = client.db();
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let newPost = await db.collection("clubs").insertOne(bodyObject);
			res.json(newPost);
			break;
		case "GET":
			const posts = await db.collection("clubs").find({}).toArray();
			res.json({ status: 200, data: posts });
			break;
	}
}
