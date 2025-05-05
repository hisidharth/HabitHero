'use server';

import { CreateCompletionRequestT } from "@/lib/api/models";
import { createCompletion, deleteCompletion } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";

export async function createCompletionAction(req: CreateCompletionRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await createCompletion(session.tokenSet.accessToken, req);
}

export async function deleteCompletionAction(habitId: number, completionId: number) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    await deleteCompletion(session.tokenSet.accessToken, habitId, completionId);
}