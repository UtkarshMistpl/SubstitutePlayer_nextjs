import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContextProvider } from "../context/AuthContext";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<SnackbarProvider maxSnack={3}>
				<AuthContextProvider>
					{" "}
					<Component {...pageProps} />
				</AuthContextProvider>
			</SnackbarProvider>
		</SessionProvider>
	);
}

export default MyApp;
