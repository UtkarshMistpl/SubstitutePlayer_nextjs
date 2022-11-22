import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
	const client = await connectToDatabase;
	const db = client.db();
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let newPost = await db.collection("clubs").insertOne(bodyObject);
			res.json(newPost.ops[0]);
			break;
		case "GET":
			const posts = await db.collection("clubs").find({}).toArray();
			res.json({ status: 200, data: posts });
			break;
	}
}
