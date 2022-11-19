import { Button } from "@mui/material";
import React from "react";
import LayOut from "../../components/Layout/layOut";
import TransitionsModal from "../../components/models/editModel";
// import MainNav from "../../components/mainNav";
import DataTable from "../../components/tables/materialTable";
import { useProtectPage } from "../../hooks/useProtectPage";
// import { BasicTable } from "../../components/tables/simpletable";

const rows = [
	{ id: 1, lastName: "Lit", firstName: "louise", gender: "M" },
	{ id: 2, lastName: "Specter", firstName: "Harvey", gender: "M" },
	{ id: 3, lastName: "", firstName: "Rachel", gender: "M" },
	{ id: 4, lastName: "Hardmen", firstName: "Arya", gender: "F" },
	{ id: 5, lastName: "Hardmen", firstName: "Pierson", gender: "M" },
	{ id: 6, lastName: "Melisandre", firstName: null, gender: "F" },
	{ id: 7, lastName: "Harris", firstName: "Sam", gender: "M" },
	{ id: 8, lastName: "Ross", firstName: "Mike", gender: "M" },
	{ id: 9, lastName: "Specter", firstName: "Donna", gender: "F" },
];

const PlayerTable = ({ message }) => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const { Protect } = useProtectPage();

	React.useEffect(() => {
		Protect();
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "firstName", headerName: "First name", width: 130 },
		{ field: "lastName", headerName: "Last name", width: 130 },
		{
			field: "gender",
			headerName: "Gender",
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
			<LayOut value={3}>
				<div className="mt-5 pt-5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-12">
								<h6>{message}</h6>
							</div>
							<div className="col-11 col-md-8">
								<DataTable rows={rows} columns={columns} setOpen={setOpen} />
							</div>
						</div>
					</div>
				</div>
				<TransitionsModal setOpen={setOpen} open={open} name={name} />
			</LayOut>
		</>
	);
};

export default PlayerTable;

export function getServerSideProps() {
	return {
		props: { message: "This text came from server side" },
	};
}
