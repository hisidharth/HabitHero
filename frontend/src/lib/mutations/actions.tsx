'use server';

import { CreateUserRequestT } from "../api/models";
import { createUser } from "../api/requests";
import { auth0 } from "../auth/auth0";

export async function createUserAction(req: CreateUserRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await createUser(session.tokenSet.accessToken, req);
}