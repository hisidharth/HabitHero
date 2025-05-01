'use server';

import { CreateCompletionRequestT } from "@/lib/api/models";
import { createCompletion } from "@/lib/api/requests";
import { auth0 } from "@/lib/auth/auth0";

export async function createCompletionAction(req: CreateCompletionRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await createCompletion(session.tokenSet.accessToken, req);
}