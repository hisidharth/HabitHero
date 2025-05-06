import DateSelector from "@/components/date_selector/date_selector";
import HabitCard from "@/components/habit_card/habit_card";
import UserCard from "@/components/user_card/user_card";
import { getAllCompletions } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";

export default async function Home({ searchParams }: { searchParams: Promise<{ page: number | undefined }> }) {
    const { page } = await searchParams;

    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const res = await getAllCompletions(session.tokenSet.accessToken, page ?? 0);

    console.log(page !== undefined && +page !== 0);
    console.log(res.startTime);
    console.log(res.endTime);

    return (
        <div className="p-5 flex flex-col gap-5">
            <UserCard />
            {res.habits.length > 0 && (
                <>
                    <p className="text-fg-medium">My Habits</p>
                    <div className="flex justify-center items-center p-5 bg-bg-medium rounded">
                        <DateSelector startDate={new Date(res.startTime)} endDate={new Date(res.endTime)} prevUrl={`/home?page=${+(page ?? 0) + 1}`} nextUrl={(page && page > 0) ? `/home?page=${page - 1}` : undefined} />
                    </div>
                </>
            )}
            <div className="flex flex-col gap-5">
                {res.habits.length === 0 && (
                    <div className="flex grow justify-center items-center">
                        <p className="text-fg-dark">Create a habit to get started!</p>
                    </div>
                )}
                {res.habits.map((habit) => <HabitCard key={habit.habitId} habit={habit} completions={res.completions[habit.habitId]} disableLog={page !== undefined && +page !== 0} />)}
            </div>
        </div>
    )
}