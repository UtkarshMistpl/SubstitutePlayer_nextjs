import { useAuthContext } from "./useAuthContext";
import { useProtectPage } from "./useProtectPage";
// import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { Protect } = useProtectPage();
	// const { dispatch: dispatchWorkouts } = useWorkoutsContext();

	const logout = () => {
		// remove user from storage
		localStorage.removeItem("user");

		// dispatch logout action
		dispatch({ type: "LOGOUT" });
		// dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
		Protect();
	};

	return { logout };
};
