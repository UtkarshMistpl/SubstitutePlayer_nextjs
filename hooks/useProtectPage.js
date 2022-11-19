import React from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const useProtectPage = () => {
	const { user } = useAuthContext();
	const { data: session, status } = useSession();

	const router = useRouter();

	const Protect = () => {
		console.log(session);
		if (status === "unauthenticated") {
			router.push("/signin");
		}
	};

	return { Protect };
};
