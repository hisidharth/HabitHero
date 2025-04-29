import NavBar from "@/components/nav_bar/nav_bar";
import ThemeToggle from "@/components/theme_toggle/theme_toggle";
import { ReactNode } from "react";

export default async function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="animate-fade-in grid grid-rows-[50px_1fr_20px] w-svw h-svh">
            <div className="flex justify-center items-center w-full bg-bg-dark">
                <div className="flex justify-between items-center grow pl-5 pr-5">
                    <h1 className="text-fg-dark text-2xl font-bold">HabitHero</h1>
                    <ThemeToggle />
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[200px_1fr] bg-dark-light">
                <NavBar />
                <div className="">
                    {children}
                </div>
            </div>
            <div className="w-full bg-bg-dark">
                <p className="text-fg-dark text-xs">v1.0.0</p>
            </div>
        </div >
    )
}