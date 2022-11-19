import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BgSignup from "../public/assets/background/BgSignUp.png";
import { Formik, Form as MyForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/login";
import React from "react";
import { useRouter } from "next/router";
import {
	useSession,
	signIn as logingIn,
	signOut,
	getSession,
} from "next-auth/react";
import { Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "../styles/Home.module.css";
import GoogleIcon from "@mui/icons-material/Google";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const backgroundImage = {
	background: `url(${BgSignup.src})`,
	height: "100vh",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
};
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	password: Yup.string().required(),
});

const initialValues = {
	email: "",
	password: "",
};

function SignIn() {
	const router = useRouter();
	const [loginState, setLoginState] = React.useState(false);
	const { user } = useAuthContext();
	const { login, isLoading, error } = useLogin();
	const { data: session, status } = useSession();
	console.log(session);

	// const [isConnected, setIsConnected] = React.useState(socket.connected);
	React.useEffect(() => {
		if (status !== "unauthenticated") router.push("/HomeMain");
	});
	const handleSubmit = async (values) => {
		console.log(values);
		await login(values.email, values.password);
		if (!error) {
			setLoginState(true);
		} else {
			setLoginState("not found");
		}
		console.log("login state: " + loginState);
	};

	React.useEffect(() => {
		if (loginState) router.push("HomeMain");
	}, [loginState]);

	// React.useEffect(() => {
	// 	if (session) {
	// 		dispatch({ type: "LOGIN", payload: session });
	// 		setLoginState(true);
	// 	}
	// }, [session]);

	// React.useEffect(() => {
	// 	socket.on("connect", () => {
	// 		console.log("running");
	// 	});

	// 	socket.emit("new_message", { message: "hellow world" });

	// 	socket.on("send_message", () => {
	// 		console.log("hello world");
	// 	});

	// 	// socket.on("disconnect", () => {
	// 	// 	console.log("disocnnected");
	// 	// });

	// 	// socket.on("message", () => {
	// 	// 	console.log("message");
	// 	// });

	// 	socket.emi;

	// 	return () => {
	// 		socket.off("connect");
	// 		socket.off("disconnect");
	// 		socket.off("pong");
	// 	};
	// }, []);

	return (
		<>
			<div className="container-fluids" style={{ height: "100vh" }}>
				<div
					className="row justify-content-center align-items-center h-100"
					style={backgroundImage}
				>
					<div className="col-10 col-lg-4 col-md-6 col-sm-8 p-3 border rounded bg-white shadow-lg">
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<MyForm className="p-2 pb-3">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Field
										className="form-control"
										type="email"
										id="email"
										name="email"
										placeholder="Enter email"
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicRole">
									<Form.Label>Password</Form.Label>
									<Field
										className="form-control"
										type="text"
										id="password"
										name="password"
										placeholder="Password"
									></Field>
								</Form.Group>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</MyForm>
						</Formik>
						<hr />
						<div className="row justify-content-center">
							<div className="col-8 pt-2">
								<Box
									className={styles.ripple}
									sx={{
										border: 1,
										borderColor: "grey.500",
										p: "0.4rem",
										borderRadius: 1,
										textAlign: "center",
										textTransform: "capitalize",
										fontWeight: "bold",
									}}
									onClick={() => {
										logingIn("GitHubProvider", {
											callbackUrl: `${process.env.NEXTAUTH_URL}/HomeMain`,
										});
									}}
								>
									Sign In With Github &nbsp;
									<GitHubIcon sx={{ paddingBottom: "0.2rem" }} />
								</Box>
								<Box
									className={styles.ripple}
									sx={{
										border: 1,
										borderColor: "grey.500",
										p: "0.4rem",
										mt: "1rem",
										borderRadius: 1,
										textAlign: "center",
										textTransform: "capitalize",
										fontWeight: "bold",
										color: "grey",
									}}
									onClick={() => {
										// logingIn();
									}}
								>
									Sign In With Google &nbsp;
									<GoogleIcon sx={{ paddingBottom: "0.2rem", color: "blue" }} />
								</Box>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignIn;
