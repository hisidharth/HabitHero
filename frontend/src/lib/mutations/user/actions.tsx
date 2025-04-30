'use server';

import { CreateUserRequestT, EditUserRequestT } from "../../api/models";
import { createUser, editUser } from "../../api/requests";
import { auth0 } from "../../auth/auth0";

export async function createUserAction(req: CreateUserRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await createUser(session.tokenSet.accessToken, req);
}

export async function editUserAction(req: EditUserRequestT) {
    const session = await auth0.getSession();
    if (!session) {
        return;
    }

    return await editUser(session.tokenSet.accessToken, req);
}

