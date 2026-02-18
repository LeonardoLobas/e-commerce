import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_NAME = "auth_token";

// Rotas públicas que não precisam de autenticação
const publicRoutes = ["/login", "/register"];

// Rotas protegidas que precisam de autenticação
const protectedRoutes = ["/"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get(TOKEN_NAME);
    const { pathname } = request.nextUrl;

    // Se está tentando acessar rota pública COM token, redireciona para home
    if (publicRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Se está tentando acessar rota protegida SEM token, redireciona para login
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
