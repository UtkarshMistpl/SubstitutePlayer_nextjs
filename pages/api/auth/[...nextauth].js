import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

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
			id: "CredentialsProvider",
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();
					throw new Error("No user found!");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					throw new Error("Incorrect Password!");
				}

				console.log(user);
				client.close();
				return { email: user.role };
			},
		}),
	],
	pages: {
		signIn: "/signin",
		error: "/signin",
	},
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
