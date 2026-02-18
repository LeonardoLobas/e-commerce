import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_NAME = "auth_token";

const publicRoutes = ["/login", "/register"];

const protectedRoutes = ["/", "/produtos", "/carrinho", "/perfil"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get(TOKEN_NAME);
    const { pathname } = request.nextUrl;

    if (publicRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (protectedRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
