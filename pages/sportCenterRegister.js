import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BgSignup from "../public/assets/background/BgSignUp.png";
import { useFormik } from "formik";
import { Formik, Form as MyForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignup } from "../hooks/useSignup";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MainNav from "../components/mainNav";
import LayOut from "../components/Layout/layOut";
import { useProtectPage } from "../hooks/useProtectPage";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const backgroundImage = {
	background: `url(${BgSignup.src})`,
	height: "100vh",
	backgroundRepeat: "no-repeat",
};
const validationSchema = Yup.object().shape({
	name: Yup.string().required(),
	phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	sports: Yup.string().required(),
	days: Yup.string().required(),
});

const initialValues = {
	email: "",
	name: "",
	mobile: "",
	days: "",
	sports: "",
};

const DAYS = [
	{ label: "Monday", value: "option_1" },
	{ label: "Tuesday", value: "option_2" },
	{ label: "Wednessday", value: "option_3" },
	{ label: "Thursday", value: "option_4" },
	{ label: "Friday", value: "option_1" },
	{ label: "Satarday", value: "option_2" },
	{ label: "Sunday", value: "option_3" },
];

const SPORTS = [
	{ label: "CRICKET", value: "option_1" },
	{ label: "FOOTBALL", value: "option_2" },
	{ label: "BASKETBALL", value: "option_3" },
	{ label: "TENNIS", value: "option_4" },
	{ label: "VOLLYBALL", value: "option_5" },
];

const SportCenter = () => {
	const { signup } = useSignup();
	const { Protect } = useProtectPage();

	React.useEffect(() => {
		Protect();
	}, []);

	const handleSubmit = async (values) => {
		await signup(values);
	};
	return (
		<>
			<LayOut value={2}>
				<div className="pt-5">
					<div className="container-fluids" style={{ height: "100vh" }}>
						<div
							className="row justify-content-center align-items-center h-100"
							style={backgroundImage}
						>
							<div className="col-12"></div>
							<div className="col-12 col-md-8 col-sm-8 col-lg-7 px-5 py-5">
								<Formik
									initialValues={initialValues}
									onSubmit={handleSubmit}
									validationSchema={validationSchema}
								>
									<MyForm className="border p-3 rounded bg-white shadow-lg">
										<Form.Group className="mb-3" controlId="formBasicName">
											<Form.Label>Club Name</Form.Label>
											<Field
												className="form-control"
												type="text"
												placeholder="Name"
												id="name"
												name="name"
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicPhone">
											<Form.Label>Contact Number</Form.Label>
											<Field
												className="form-control"
												name="mobile"
												id="mobile"
												type="text"
												placeholder="Number"
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicAddress">
											<Form.Label>Address</Form.Label>
											<Field
												className="form-control"
												type="text"
												placeholder="Address"
												id="address"
												name="address"
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
										<Form.Group className="mb-3" controlId="formBasicRole">
											<Form.Label>Open Day's</Form.Label>
											<Field
												as="select"
												className="form-control"
												aria-label="Default select example"
												id="days"
												name="sports"
												defaultValue={"default"}
											>
												<option value={"default"}>Open this select menu</option>
												{DAYS.map((row, index) => {
													return (
														<option key={index} value={row.value}>
															{row.label}
														</option>
													);
												})}
											</Field>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicRole">
											<Form.Label>Sports</Form.Label>
											<Field
												as="select"
												className="form-control"
												aria-label="Default select example"
												id="sports"
												name="sports"
												defaultValue={"default"}
											>
												<option value={"default"}>Open this select menu</option>
												{SPORTS.map((row, index) => {
													return (
														<option key={index} value={row.value}>
															{row.label}
														</option>
													);
												})}
											</Field>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicTime">
											<Form.Label>Open From </Form.Label>
											<Field
												className="form-control"
												name="timefrom"
												id="time_from"
												type="time"
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicTime">
											<Form.Label>Closed at </Form.Label>
											<Field
												className="form-control"
												name="timeTo"
												id="time_to"
												type="time"
											/>
										</Form.Group>
										<Button variant="primary" type="submit">
											Submit
										</Button>
									</MyForm>
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</LayOut>
		</>
	);
};

export default SportCenter;
