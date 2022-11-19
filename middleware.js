import { NextResponse } from "next/server";

export function middleware(req) {
	const url = req.nextUrl.clone();
	if (url.pathname === "/") {
		url.pathname = "/signin";
		return NextResponse.redirect(url);
	}
}
