import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from './AuthProvider'; // simple React.Context
import { useAuthContext } from "../../hooks/useAuthContext";
import LayOut from "../Layout/layOut";

const PrivateRoute = () => {
	const { user } = useAuthContext();

	// const { authenticated } = useContext(AuthContext);
	return user ? (
		<LayOut>
			<Outlet />
		</LayOut>
	) : (
		<Navigate to="/login" />
	);
};
export default PrivateRoute;
