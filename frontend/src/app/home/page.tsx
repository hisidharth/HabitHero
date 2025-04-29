import UserCard from "@/components/user_card/user_card";

export default async function Home() {
    return (
        <div className="p-5">
            <div className="flex flex-col">
                <UserCard />
            </div>
        </div>
    )
}