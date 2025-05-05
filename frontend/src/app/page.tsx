import LoginButton from "@/components/login_button/login_button";

export default async function Home() {
    return (
        <div className="w-svw h-svh flex flex-col gap-5 justify-center items-center">
            <h1 className="text-3xl text-fg-dark font-bold">HabitHero</h1>
            <LoginButton />
        </div>
    );
}
