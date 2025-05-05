import CompletionTable from "@/components/completion_table/completion_table";
import HabitCard from "@/components/habit_card/habit_card";
import { getSomeCompletions } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function HabitPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const res = await getSomeCompletions(session.tokenSet.accessToken, parseInt(id));

    return (
        <div className="p-5">
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <div className="flex items-center justify-center bg-bg-medium p-5 rounded">
                        <Link href="/home">
                            <ChevronLeft width={25} height={25} className="text-fg-dark" />
                        </Link>
                    </div>
                    <HabitCard habit={res.habit} completions={res.completions} />
                </div>
                {res.completions.length > 0 ? (
                    <>
                        <p className="text-fg-medium">Completions</p>
                        <CompletionTable completions={res.completions} />
                    </>
                ) : (
                    <p className="text-fg-medium">No completions yet!</p>
                )}
            </div>
        </div>
    )
}