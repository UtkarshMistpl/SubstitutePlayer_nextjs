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
import { useSnackbar, SnackbarContent } from "notistack";
import Multiselect from "multiselect-react-dropdown";
import { useRegister, isLoading, error } from "../hooks/useRegisterPlayer";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const backgroundImage = {
	background: `url(${BgSignup.src})`,
	height: "100vh",
	backgroundRepeat: "no-repeat",
};
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
	email: Yup.string()
		.email("Invalid email address format")
		.required("Email is required"),
	address: Yup.string().required("Address is required"),
});

const initialValues = {
	email: "",
	name: "",
	address: "",
	contact: "",
	_from: "",
	_to: "",
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
	// const { signup } = useSignup();
	const { Protect } = useProtectPage();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { register, error, isLoading } = useRegister();

	const inistialSelectedValues = {
		days: DAYS,
		sports: SPORTS,
	};
	const [selectedValues, setSelectedValues] = React.useState(
		inistialSelectedValues
	);
	React.useEffect(() => {
		Protect();
	}, []);

	const handleSubmit = async (values) => {
		try {
			const registerFromValues = {
				...values,
				...selectedValues,
			};
			let result = await register(registerFromValues, "registerClub");
		} catch {
			enqueueSnackbar("Failed to submit data", {
				variant: "error",
			});
		}

		if (!error) {
			enqueueSnackbar("This is a success message!", {
				variant: "success",
			});
		}
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
							<div className="col-12 col-md-8 col-sm-8 col-lg-6 px-5 py-5">
								<Formik
									initialValues={initialValues}
									onSubmit={handleSubmit}
									validationSchema={validationSchema}
									validateOnChange={false}
									validateOnBlur={false}
								>
									<MyForm className="border px-4 py-3 rounded bg-white shadow-lg">
										<Form.Group className="mb-3" controlId="formBasicName">
											<Form.Label>Club Name</Form.Label>
											<Field
												className="form-control"
												type="text"
												placeholder="Name"
												id="name"
												name="name"
											/>
											<ErrorMessage name="name">
												{(msg) => <div style={{ color: "red" }}>{msg}</div>}
											</ErrorMessage>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPhone">
											<Form.Label>Contact Number</Form.Label>
											<Field
												className="form-control"
												name="contact"
												id="contact"
												type="text"
												placeholder="Number"
											/>
											<ErrorMessage name="contact">
												{(msg) => <div style={{ color: "red" }}>{msg}</div>}
											</ErrorMessage>
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
											<ErrorMessage name="address">
												{(msg) => <div style={{ color: "red" }}>{msg}</div>}
											</ErrorMessage>
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
											<ErrorMessage name="email">
												{(msg) => <div style={{ color: "red" }}>{msg}</div>}
											</ErrorMessage>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicDay">
											<Form.Label>Open Days</Form.Label>
											<Multiselect
												options={DAYS} // Options to display in the dropdown
												selectedValues={selectedValues.days} // Preselected value to persist in dropdown
												onSelect={(e) => {
													selectedValues.days = e;
													console.log("event or values", selectedValues);
												}} // Function will trigger on select event
												onRemove={(e) => {
													selectedValues.days = e;
												}} // Function will trigger on remove event
												displayValue="label" // Property name to display in the dropdown options
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicDay">
											<Form.Label>Sports</Form.Label>
											<Multiselect
												options={SPORTS} // Options to display in the dropdown
												selectedValues={selectedValues.sports} // Preselected value to persist in dropdown
												onSelect={(e) => {
													selectedValues.sports = e;
													console.log("event or values", selectedValues);
												}} // Function will trigger on select event
												onRemove={(e) => {
													selectedValues.sports = e;
												}} // Function will trigger on remove event
												displayValue="label" // Property name to display in the dropdown options
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicTime">
											<Form.Label>Open From </Form.Label>
											<Field
												className="form-control"
												name="_from"
												id="_from"
												type="time"
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicTime">
											<Form.Label>Closed at </Form.Label>
											<Field
												className="form-control"
												name="_to"
												id="_to"
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
