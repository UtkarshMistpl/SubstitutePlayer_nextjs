import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import { useState } from "react";

const FilterForm = () => {
	const SPORTS = [
		{ label: "CRICKET", value: "option_1" },
		{ label: "FOOTBALL", value: "option_2" },
		{ label: "BASKETBALL", value: "option_3" },
		{ label: "TENNIS", value: "option_4" },
		{ label: "VOLLYBALL", value: "option_5" },
	];

	const DAYS = [
		{ label: "Monday", value: "option_1" },
		{ label: "Tuesday", value: "option_2" },
		{ label: "Wednessday", value: "option_3" },
		{ label: "Thursday", value: "option_4" },
		{ label: "Friday", value: "option_1" },
		{ label: "Satarday", value: "option_2" },
		{ label: "Sunday", value: "option_3" },
	];

	const validationSchema = Yup.object().shape({
		sports: Yup.string().required(),
		day: Yup.string().required(),
		time: Yup.string().required(),
		location: Yup.string().required(),
	});

	const initialValues = {
		sports: "",
		time: "",
		day: "",
		location: "",
	};

	const handleSubmit = (values) => {
		console.log("Input Values", values);
	};

	const [valueSports, setvalueSports] = useState("");
	const [valueDays, setvalueDays] = useState("");

	const handleOnchangeSports = (val) => {
		setvalueSports(val);
	};
	const handleOnchangeDays = (val) => {
		setvalueDays(val);
	};

	return (
		<>
			<Formik
				style={{ padding: "2rem" }}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<div className="container p-3">
						<div className="row justify-content-center">
							<div className="col-11  form-group p-2">
								<label>Sport</label>
								<select
									className="form-select"
									aria-label="Default select example"
									defaultValue={0}
								>
									<option value={0}>Select a sport</option>
									{SPORTS.map((row, index) => {
										return (
											<option key={index} value={row.value}>
												{row.label}
											</option>
										);
									})}
								</select>

								{/* {error ? <ErrorMessage /> : null} */}
							</div>
							<div className="col-11 form-group p-2">
								<label>Day</label>
								<select
									className="form-select"
									aria-label="Default select example"
									defaultValue={"default"}
								>
									<option value={"default"}>Select a day</option>
									{DAYS.map((row, index) => {
										return (
											<option key={index} value={row.value}>
												{row.label}
											</option>
										);
									})}
								</select>

								{/* <ErrorMessage /> */}
							</div>
							<div className="col-11 p-2" style={{ paddingRight: "3rem" }}>
								<label>From</label>
								<input className="form-control" type="time" />
								{/* <ErrorMessage /> */}
							</div>
							<div className="col-11 form-group p-2">
								<label>To</label>
								<input className="form-control" type="time" />
								{/* <ErrorMessage /> */}
							</div>
							<div className="col-11 form-group p-2">
								<label>Place</label>
								<input className="form-control" type="text" />
								{/* <ErrorMessage /> */}
							</div>
							<div className="col-11">
								<Button
									type="submit"
									color="primary"
									variant="contained"
									sx={{ marginTop: "2rem" }}
								>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
};

export default FilterForm;
