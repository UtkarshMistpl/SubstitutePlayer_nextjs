import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

export const authOptions = {
	//Configure JWT
	session: {
		jwt: true,
	},

	// Configure one or more authentication providers
	providers: [
		// ...add more providers here
		GitHubProvider({
			id: "GitHubProvider",
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			id: "GoogleProvider",
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			id: "Credentials",
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {},
			async authorize(credentials, req) {
				//Connect to DB
				const client = await MongoClient.connect(
					`MONGO_URI=mongodb+srv://utkarsh:hO3SZk1dKbzun0BS@cluster0.a4zxnps.mongodb.net/?retryWrites=true&w=majority`,
					{ useNewUrlParser: true, useUnifiedTopology: true }
				);
				//Get all the users
				const users = await client.db().collection("users");
				//Find user with the email
				const result = await users.findOne({
					email: credentials.email,
				});
				//Not found - send error res
				if (!result) {
					client.close();
					throw new Error("No user found with the email");
				}
				//Check hased password with DB password
				const checkPassword = await compare(
					credentials.passowrd,
					result.passowrd
				);
				//Incorrect password - send response
				if (!checkPassword) {
					client.close();
					throw new Error("Password doesnt match");
				}
				//Else send success response
				client.close();
				return { email: result.email };
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
