import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
	const client = await connectToDatabase();
	const db = client.db();
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let newPost = await db.collection("players").insertOne(bodyObject);
			client.close();
			res.json(newPost);
			break;
		case "GET":
			const posts = await db.collection("players").find({}).toArray();
			res.json({ status: 200, data: posts });
			break;
	}
}
