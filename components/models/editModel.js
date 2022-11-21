import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: "0.7rem",
};

export default function TransitionsModal({ open, setOpen, name }) {
	// const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							{name}
						</Typography>
						<div className="container-fluid mt-2">
							<div className="row">
								<div className="col-6">
									<label for="exampleInputEmail1">Email</label>
									<input
										type="email"
										class="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
								</div>
								<div className="col-6">
									<label for="exampleInputEmail1">Name</label>
									<input
										type="email"
										class="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
								</div>
								<div className="col-6">
									<label for="exampleInputEmail1">last name</label>
									<input
										type="email"
										class="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
								</div>
								<div className="col-6">
									<label for="exampleInputEmail1">Phone</label>
									<input
										type="email"
										class="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
									/>
								</div>
								<div className="col-12 p-3">
									<Button variant="contained" color="primary">
										Edit
									</Button>
								</div>
							</div>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
