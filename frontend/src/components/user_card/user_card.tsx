import { getUser } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";
import ProgressBar from "../progess_bar/progress_bar";

export default async function UserCard() {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    const user = await getUser(session.tokenSet.accessToken);

    return (
        <div className="flex flex-col gap-5 p-6 w-full rounded-md bg-bg-medium">
            <div className="flex items-center gap-5">
                <div className="flex justify-center items-center w-20 h-20 bg-bg-light rounded-full">
                    <p className="text-4xl font-bold text-fg-dark">{user.username[0]}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-fg-dark text-lg font-bold">{user.username}</p>
                    <div className="flex items-center gap-1">
                        <p className="text-xs text-fg-medium">Level {user.currentLevel}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
                <ProgressBar value={0.5} />
                <p className="text-sm text-fg-dark font-bold">{user.xp}/5,000</p>
            </div>
        </div>
    )
}