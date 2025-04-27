import { auth0 } from "@/lib/auth/auth0";
import { type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = await auth0.middleware(req);

    if (req.nextUrl.pathname.startsWith('/auth')) {
        return res;
    }

    try {
        // ensure token is refreshed
        await auth0.getAccessToken();
    } catch {
        console.log('no token');
    }

    return res;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};