import HabitCard from "@/components/habit_card/habit_card";
import UserCard from "@/components/user_card/user_card";
import { getAllCompletions } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";

export default async function Home() {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const res = await getAllCompletions(session.tokenSet.accessToken);

    const habits = [];
    for (const habitId in res.habits) {
        habits.push(res.habits[habitId]);
    }

    return (
        <div className="p-5">
            <div className="flex flex-col gap-5">
                <UserCard />
                {habits.length > 0 && (
                    <p className="text-fg-medium">My Habits</p>
                )}
                <div className="flex flex-col gap-5">
                    {habits.length === 0 && (
                        <div className="flex grow justify-center items-center">
                            <p className="text-fg-dark">Create a habit to get started!</p>
                        </div>
                    )}
                    {habits.map((habit) => <HabitCard key={habit.habitId} habit={habit} completions={res.completions[habit.habitId]} />)}
                </div>
            </div>
        </div>
    )
}