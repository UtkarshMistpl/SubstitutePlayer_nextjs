import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	// const { dispatch } = useAuthContext();

	const register = async (values, endPoint) => {
		setIsLoading(true);
		setError(null);
		console.log("values : ", values);

		const response = await fetch(
			`https://substitute-player-nextjs.vercel.app/api/register/${endPoint}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);
		// console.log(response);
		const json = await response.json();
		// console.log(json);

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (response.ok) {
			// update loading state
			setIsLoading(false);
		}
	};

	return { register, isLoading, error };
};
