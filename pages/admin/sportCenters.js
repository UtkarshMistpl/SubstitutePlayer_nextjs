import React from "react";
import LayOut from "../../components/Layout/layOut";
import MainNav from "../../components/mainNav";
import DataTable from "../../components/tables/materialTable";
import { useProtectPage } from "../../hooks/useProtectPage";
import { Button } from "@mui/material";
import TransitionsModal from "../../components/models/editModel";

// import { BasicTable } from "../../components/tables/simpletable";

// const rows = [
// 	{ id: 1, club: "One", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 2, club: "Two", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 3, club: "Three", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 4, club: "Four", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 5, club: "Five", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 6, club: "Six", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 7, club: "Seven", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 8, club: "Eight", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 9, club: "Nine", address: "Dwarka Dham", contact: "1111111111" },
// 	{
// 		id: 10,
// 		club: "Ten",
// 		address: "Dwarka Dham",
// 		contact: "1111111111",
// 	},
// 	{ id: 11, club: "Eleven", address: "Dwarka Dham", contact: "1111111111" },
// 	{ id: 12, club: "Tweleve", address: "Dwarka Dham", contact: "1111111111" },
// ];

const SportCenterTable = ({ data }) => {
	const { Protect } = useProtectPage();
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const [rows, setRows] = React.useState([]);
	React.useEffect(() => {
		Protect();
	});
	React.useEffect(() => {
		// console.log("data", data);
		const temp_rows = data.data.map((result, i) => {
			return {
				id: i + 1,
				club: result.name,
				address: result.address,
				contact: result.contact,
			};
		});
		setRows(temp_rows);
	}, []);

	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "club", headerName: "Club", width: 130 },
		{ field: "address", headerName: "Address", width: 130 },
		{
			field: "contact",
			headerName: "Contact",
			width: 130,
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
							<div className="col-12 col-md-10 col-lg-8">
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

export async function getServerSideProps(context) {
	const res = await fetch(
		`https://substitute-player-nextjs.vercel.app/api/register/registerClub`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	);
	const data = await res.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data: data }, // will be passed to the page component as props
	};
}
