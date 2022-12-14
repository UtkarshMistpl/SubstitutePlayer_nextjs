import {
	AppBar,
	Toolbar,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
	Box,
	Button,
} from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState } from "react";
import DrawerComp from "./drawer";
import { useLogout } from "../hooks/useLogout";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

// import { unstable_renderSubtreeIntoContainer } from "react-dom";

// import { Tab } from "@chakra-ui/react";
const MainNav = (props) => {
	const [value, setValue] = useState(props.value);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
	const Pages = ["Home", "Register Player", "Register Club", "Players", "Club"];
	const { logout } = useLogout();
	const router = useRouter();
	const { user } = useAuthContext();
	const { data: session, status } = useSession();

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

	const logoutNext = async () => {
		const data = await signOut({
			redirect: false,
		});
		router.push("/signin");
	};

	return (
		<>
			<Box sx={{ boxShadow: 3 }}>
				<AppBar sx={{ background: "#319795" }}>
					<Toolbar>
						<Typography>Substitute Player</Typography>

						{isMatch && <DrawerComp />}
						{!isMatch && (
							<Tabs
								textColor="inherit"
								value={value}
								sx={{
									"& .MuiTabs-indicator": { backgroundColor: "#54e1d9" },
								}}
								onChange={(e, value) => {
									setValue(value);
									const Path = changeRoute(value);
									router.push(Path);
								}}
							>
								{Pages.map((page, index) => {
									if (
										index < 3 ||
										(session ? (session.role == "admin" ? true : false) : false)
									)
										return <Tab key={index} label={page} />;
								})}
							</Tabs>
						)}

						<Button
							sx={{
								marginLeft: "auto",
								marginRight: "0.5rem",
								cursor: "pointer",
								color: "#ffffff",
							}}
							onClick={logoutNext}
						>
							Logout <LogoutRoundedIcon />
						</Button>

						<Face6Icon />
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default MainNav;
