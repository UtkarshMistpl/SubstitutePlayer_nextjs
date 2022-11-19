import React from "react";
import LayOut from "../../components/Layout/layOut";
import MainNav from "../../components/mainNav";
import DataTable from "../../components/tables/materialTable";
import { useProtectPage } from "../../hooks/useProtectPage";
import { Button } from "@mui/material";
import TransitionsModal from "../../components/models/editModel";

// import { BasicTable } from "../../components/tables/simpletable";

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const SportCenterTable = () => {
	const { Protect } = useProtectPage();
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	React.useEffect(() => {
		Protect();
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "firstName", headerName: "First name", width: 130 },
		{ field: "lastName", headerName: "Last name", width: 130 },
		{
			field: "age",
			headerName: "Age",
			type: "number",
			width: 90,
		},
		{
			field: "fullName",
			headerName: "Full name",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			width: 160,
			valueGetter: (params) =>
				`${params.row.firstName || ""} ${params.row.lastName || ""}`,
		},
		{
			field: "Action",
			headerName: "Action",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			width: 160,
			renderCell: (cellValue) => {
				return (
					<div>
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
								setOpen(true);
								setName(cellValue.row.firstName);
							}}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
								alert(
									`Are you sure you want remove ${cellValue.row.firstName}`
								);
							}}
							sx={{ marginLeft: "0.3rem" }}
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<>
			<LayOut value={4}>
				<div className="mt-5 pt-5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-11 col-md-8">
								<DataTable rows={rows} columns={columns} />
							</div>
						</div>
					</div>
				</div>
				<TransitionsModal setOpen={setOpen} open={open} name={name} />
			</LayOut>
		</>
	);
};

export default SportCenterTable;
