import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BgSignup from "../public/assets/background/BgSignUp.png";
import { useFormik } from "formik";
import { Formik, Form as MyForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignup } from "../hooks/useSignup";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const backgroundImage = {
	background: `url(${BgSignup.src})`,
	height: "100vh",
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
};
const validationSchema = Yup.object().shape({
	name: Yup.string().required(),
	phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	role: Yup.string().required(),
	status: Yup.string().required(),
	password: Yup.string().required(),
	cpassword: Yup.string().required(),
});

const initialValues = {
	email: "",
	password: "",
	cpassword: "",
	name: "",
	mobile: "",
	username: "",
	role: "",
	status: "",
};

function SignUp() {
	const { signup } = useSignup();
	const { user } = useAuthContext();

	React.useEffect(() => {
		console.log(user);
	}, []);

	const handleSubmit = async (values) => {
		await signup(values);
	};
	return (
		<>
			<div className="container-fluids" style={{ height: "100vh" }}>
				<div
					className="row justify-content-center align-items-center h-100"
					style={backgroundImage}
				>
					<div className="col-10 col-md-8 col-sm-8 col-lg-7 px-5 py-5">
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<MyForm className="border p-3 rounded bg-white shadow-lg">
								<Form.Group className="mb-3" controlId="formBasicName">
									<Form.Label>Name</Form.Label>
									<Field
										className="form-control"
										type="text"
										placeholder="Name"
										id="name"
										name="name"
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicPhone">
									<Form.Label>Mobile Number</Form.Label>
									<Field
										className="form-control"
										name="mobile"
										id="mobile"
										type="text"
										placeholder="Number"
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Field
										className="form-control"
										type="email"
										id="email"
										name="email"
										placeholder="Enter email"
									/>
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicName">
									<Form.Label>User Name</Form.Label>
									<Field
										className="form-control"
										type="text"
										placeholder="User name"
										id="username"
										name="username"
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicName">
									<Form.Label>Password</Form.Label>
									<Field
										className="form-control"
										type="text"
										placeholder="Password"
										id="password"
										name="password"
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicName">
									<Form.Label>Confirm Password</Form.Label>
									<Field
										className="form-control"
										type="text"
										placeholder="Password"
										id="cpassword"
										name="cpassword"
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicRole">
									<Form.Label>Role</Form.Label>
									<Field
										as="select"
										className="form-control"
										aria-label="Default select example"
										id="role"
										name="role"
									>
										<option>Open this select menu</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</Field>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicRole">
									<Form.Label>Status</Form.Label>
									<Field
										as="select"
										className="form-control"
										aria-label="Default select example"
										id="status"
										name="status"
									>
										<option>Open this select menu</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</Field>
								</Form.Group>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</MyForm>
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
