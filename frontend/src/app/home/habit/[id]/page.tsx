import CompletionTable from "@/components/completion_table/completion_table";
import DateSelector from "@/components/date_selector/date_selector";
import HabitCard from "@/components/habit_card/habit_card";
import { getSomeCompletions } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function HabitPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page: string | undefined }> }) {
    const { id } = await params;
    const { page } = await searchParams;

    const pageNum = page ? parseInt(page) : 0;

    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const res = await getSomeCompletions(session.tokenSet.accessToken, parseInt(id), pageNum);

    return (
        <div className="p-5">
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <div className="flex items-center justify-center bg-bg-medium p-5 rounded">
                        <Link href="/home">
                            <ChevronLeft width={25} height={25} className="text-fg-dark" />
                        </Link>
                    </div>
                    <HabitCard habit={res.habit} completions={res.completions} disableLog={pageNum !== 0} />
                </div>
                <p className="text-fg-medium">Completions</p>
                <div className="flex justify-center items-center p-5 bg-bg-medium rounded">
                    <DateSelector startDate={new Date(res.startTime)} endDate={new Date(res.endTime)} prevUrl={`/home/habit/${id}?page=${(pageNum + 1)}`} nextUrl={pageNum > 0 ? `/home/habit/${id}?page=${pageNum - 1}` : undefined} />
                </div>
                {res.completions.length > 0 ? (
                    <>
                        <CompletionTable completions={res.completions} />
                    </>
                ) : (
                    <p className="text-fg-medium">Nothing here yet!</p>
                )}
            </div>
        </div>
    )
}