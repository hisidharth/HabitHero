import { Endpoints } from "@/lib/api/endpoints";

export default async function LogoutButton() {
    return (
        <a href={`/auth/logout?returnTo=${Endpoints.selfUrl}/`}>
            <button>Log out</button>
        </a>
    )
}