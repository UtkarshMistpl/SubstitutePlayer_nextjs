import {
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Divider,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

const changeRoute = (value) => {
	switch (value) {
		case 0:
			return "/HomeMain";
		case 1:
			return "/playerRegister";
		case 2:
			return "/sportCenterRegister";
		case 3:
			return "/admin/playerTable";
		case 4:
			return "/admin/sportCenters";
		default:
			return "/HomeMain";
	}
};

const DrawerComp = () => {
	const [openDrawer, setOpenDrawer] = useState();
	const Pages = ["Home", "Register Player", "Register Club", "Players", "Club"];
	const router = useRouter();
	return (
		<>
			<Drawer
				open={openDrawer}
				onClose={() => {
					setOpenDrawer(false);
				}}
			>
				<List>
					<ListItemButton
						key={5}
						onClick={() => {
							setOpenDrawer(false);
						}}
					>
						<ListItemIcon>
							<ListItemText>Substitute Player</ListItemText>
						</ListItemIcon>
					</ListItemButton>
					<Divider variant="middle" light={false} />

					{Pages.map((page, index) => {
						return (
							<ListItemButton
								key={index}
								onClick={() => {
									setOpenDrawer(false);
									const path = changeRoute(index);
									router.push(path);
								}}
							>
								<ListItemIcon>
									<ListItemText>{page}</ListItemText>
								</ListItemIcon>
							</ListItemButton>
						);
					})}
				</List>
			</Drawer>
			<MenuIcon
				onClick={() => {
					setOpenDrawer(!openDrawer);
				}}
				sx={{ marginLeft: "1rem" }}
			/>
		</>
	);
};

export default DrawerComp;
