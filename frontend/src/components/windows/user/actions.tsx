'use server';

import { Endpoints } from "@/lib/api/endpoints";
import { redirect } from "next/navigation";

export async function logout() {
    redirect(`/auth/logout?returnTo=${Endpoints.selfUrl}/`);
}