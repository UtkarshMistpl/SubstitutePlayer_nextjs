import { useRouter } from "next/router";
import React from "react";
import FilterForm from "../components/filterForm";
import LayOut from "../components/Layout/layOut";
import { useProtectPage } from "../hooks/useProtectPage";
import MyMapComponent from "../components/maps";
import SimpleMap from "../components/googleMaps/mapreact";
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
				<div className="container mt-5 pt-5">
					<div className="row justify-content-around">
						<div className="col-12"></div>
						<div className="col-12 col-md-4">
							{/* <h4 className="px-4">Build your team to play with</h4> */}
							<div className="">
								<FilterForm />
							</div>
						</div>
						<div className="col-12 col-md-6 p-3">
							{/* <img className="img-fluid" src={tempMap} /> */}
							{/* <MyMapComponent /> */}
							<SimpleMap />
						</div>
						<div className="col-12">
							<div className="p-3"></div>
						</div>
					</div>
				</div>
			</LayOut>
		</>
	);
};

export default HomeMain;
