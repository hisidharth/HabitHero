import * as t from 'io-ts';

export const User = t.type({
    userId: t.string,
    username: t.string,
    email: t.string,
    currentLevel: t.number,
    xp: t.number
});

export type UserT = t.TypeOf<typeof User>;

export const Habit = t.type({
    habitId: t.number,
    userId: t.string,
    habitName: t.string,
    frequency: t.number,
    category: t.string
});

export type HabitT = t.TypeOf<typeof Habit>;

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

export const EditUserRequest = t.type({
    username: t.string
});

export type EditUserRequestT = t.TypeOf<typeof EditUserRequest>;

export const GetAllHabitsResponse = t.type({
    habits: t.array(Habit)
});

export type GetAllHabitsResponseT = t.TypeOf<typeof GetAllHabitsResponse>;

export const CreateHabitRequest = t.type({
    habitName: t.string,
    frequency: t.number,
    category: t.string
});

export type CreateHabitRequestT = t.TypeOf<typeof CreateHabitRequest>;

export const EditHabitRequest = t.type({
    habitName: t.string,
    frequency: t.number,
    category: t.string
});

export type EditHabitRequestT = t.TypeOf<typeof EditHabitRequest>;
