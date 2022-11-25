import mongoose from "mongoose";
const Client = async () =>
	mongoose.connect(
		"mongodb+srv://utkarsh:hO3SZk1dKbzun0BS@cluster0.a4zxnps.mongodb.net/?retryWrites=true&w=majority"
	);
export default Client;
