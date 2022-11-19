import React from "react";
import MainNav from "../mainNav";
// import { useLocation } from "react-router-dom";

const LayOut = ({ children, ...props }) => {
	// const location = useLocation();
	// React.useEffect(() => {
	// 	setPathValue(3);
	// }, [location]);
	console.log(props.value);
	return (
		<>
			<MainNav value={props.value} />
			{children}
		</>
	);
};

export default LayOut;
