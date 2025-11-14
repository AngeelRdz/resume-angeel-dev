import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./src/config/i18n.config";

const PUBLIC_FILE = /\.(.*)$/;
const ENABLE_LOCALE_REDIRECT = false;

function pathHasLocale(pathname: string) {
	return i18n.locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
	);
}

export function middleware(request: NextRequest) {
	if (!ENABLE_LOCALE_REDIRECT) {
		return NextResponse.next();
	}

	const { pathname } = request.nextUrl;

	if (
		pathname.startsWith("/_next") ||
		pathname.includes("/api/") ||
		PUBLIC_FILE.test(pathname)
	) {
		return NextResponse.next();
	}

	if (pathname === "/" || pathname === "") {
		return NextResponse.next();
	}

	if (!pathHasLocale(pathname)) {
		const locale = i18n.defaultLocale;
		const redirectURL = new URL(
			`/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
			request.url
		);

		return NextResponse.redirect(redirectURL);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|api|.*\\..*).*)"],
};
