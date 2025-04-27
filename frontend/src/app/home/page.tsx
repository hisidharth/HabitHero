import LogoutButton from "@/components/logout_button/logout_button";
import { auth0 } from "@/lib/auth/auth0";

export default async function Home() {
    const session = await auth0.getSession();

    if (!session) {
        return (
            <p>Not logged in</p>
        );
    }

    return (
        <>
            <p>{session.tokenSet.accessToken}</p>
            <LogoutButton />
        </>
    )
}