import { Endpoints } from "@/lib/api/endpoints";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <a href={`/auth/logout?returnTo=${Endpoints.selfUrl}/`}>
            <div className="flex items-center gap-1 text-red-600">
                <LogOut width={15} height={15} />
                <p className="text-sm ">Log out</p>
            </div>
        </a>
    )
}