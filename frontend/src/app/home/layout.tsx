import NavBar from "@/components/nav_bar/nav_bar";
import ThemeToggle from "@/components/theme_toggle/theme_toggle";
import CreateUserWindow from "@/components/windows/user/create";
import { getUser } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";
import { ReactNode } from "react";

export default async function HomeLayout({ children }: { children: ReactNode }) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const res = await getUser(session.tokenSet.accessToken);
    if (!res.user) {
        return (
            <div className="animate-fade-in grid w-svw h-svh">
                <CreateUserWindow email={session.user.email ?? 'unknown'} />
            </div>
        )
    }

    const user = res.user;

    return (
        <div className="animate-fade-in grid grid-rows-[50px_1fr_20px] w-svw h-svh">
            <div className="flex justify-center items-center w-full bg-bg-dark">
                <div className="flex justify-between items-center grow pl-5 pr-5">
                    <h1 className="text-fg-dark text-2xl font-bold">HabitHero</h1>
                    <ThemeToggle />
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[200px_1fr] bg-dark-light">
                <NavBar user={user} />
                <div className="overflow-y-scroll h-[calc(100svh-50px-20px)]">
                    {children}
                </div>
            </div>
            <div className="w-full bg-bg-dark">
                <p className="text-fg-dark text-xs">v1.0.0</p>
            </div>
        </div >
    )
}