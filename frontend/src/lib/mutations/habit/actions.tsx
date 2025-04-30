'use server';

import { CreateHabitRequestT, EditHabitRequestT } from "@/lib/api/models";
import { createHabit, deleteHabit, editHabit } from "@/lib/api/requests";
import { auth0 } from "../../auth/auth0";

export async function createHabitAction(req: CreateHabitRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await createHabit(session.tokenSet.accessToken, req);
}

export async function editHabitAction(habitId: number, req: EditHabitRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await editHabit(session.tokenSet.accessToken, habitId, req);
}

export async function deleteHabitAction(habitId: number) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await deleteHabit(session.tokenSet.accessToken, habitId);
}