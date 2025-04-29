import * as t from 'io-ts';

export const GetUserResponse = t.type({
    userId: t.string,
    username: t.string,
    email: t.string,
    currentLevel: t.number,
    xp: t.number
});

export type GetUserResponseT = t.TypeOf<typeof GetUserResponse>;

export const CreateUserRequest = t.type({
    username: t.string,
    email: t.string
});

export type CreateUserRequestT = t.TypeOf<typeof CreateUserRequest>;