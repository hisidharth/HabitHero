import * as t from 'io-ts';

export const User = t.type({
    userId: t.string,
    username: t.string,
    email: t.string,
    currentLevel: t.number,
    xp: t.number
});

export type UserT = t.TypeOf<typeof User>;

export const GenericResponse = t.type({
    success: t.boolean
})

export type GenericResponseT = t.TypeOf<typeof GenericResponse>;

export const GetUserResponse = t.type({
    user: t.union([
        User,
        t.null
    ])
});

export type GetUserResponseT = t.TypeOf<typeof GetUserResponse>;

export const CreateUserRequest = t.type({
    username: t.string,
    email: t.string
});

export type CreateUserRequestT = t.TypeOf<typeof CreateUserRequest>;