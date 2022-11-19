import { useRouter } from "next/router";
import React from "react";
import FilterForm from "../components/filterForm";
import LayOut from "../components/Layout/layOut";
import { useProtectPage } from "../hooks/useProtectPage";
import MyMapComponent from "../components/maps";
// import Demo from "../components/location/currentLocation";

// import tempMap from "../public/assets/background/temMapImage.jpg";

const HomeMain = () => {
	const { Protect } = useProtectPage();

	React.useEffect(() => {
		Protect();
	});

	return (
		<>
			<LayOut value={0}>
				<div className="mt-5 pt-5 text-center">
					<h4>Build your team to play with</h4>
					<FilterForm />
				</div>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-md-6 col-lg-4">
							{/* <img className="img-fluid" src={tempMap} /> */}
							<MyMapComponent />
						</div>
						<div className="col-12">
							<div className="p-3">{/* <Demo /> */}</div>
						</div>
					</div>
				</div>
			</LayOut>
		</>
	);
};

export default HomeMain;
