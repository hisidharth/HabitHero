import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { redirect } from "next/navigation";
import { Endpoints } from './endpoints';
import { CreateCompletionRequestT, CreateHabitRequestT, CreateUserRequestT, EditHabitRequestT, EditUserRequestT, GenericResponse, GetAllCompletionsResponse, GetAllHabitsResponse, GetSomeCompletionsResponse, GetUserResponse } from './models';
import { deleteReq, getReq, postReq } from './util';

export async function request(url: string, data: RequestInit, accessToken: string): Promise<Response> {
    data.headers = new Headers(data.headers);
    data.headers.set('Authorization', `Bearer ${accessToken}`);

    const response = await fetch(url, data);

    if (response.status === 401) {
        redirect('/login');
    } else if (response.status !== 200 && response.status !== 201) {
        throw new Error('request failed');
    }

    return response;
}

export async function requestAndDecode<C extends t.Mixed>(path: string, data: RequestInit, decoder: C, accessToken: string): Promise<t.TypeOf<typeof decoder>> {
    const url = Endpoints.mainApiInternal + path;

    const response = await request(url, data, accessToken);
    const parsed: unknown = await response.json();

    const decoded = decoder.decode(parsed);
    if (isLeft(decoded)) {
        throw new Error(`could not validate data: ${PathReporter.report(decoded).join('\n')}`);
    }

    return decoded.right;
}

export async function getUser(accessToken: string) {
    return await requestAndDecode('/user/me', getReq(), GetUserResponse, accessToken);
}

export async function createUser(accessToken: string, req: CreateUserRequestT) {
    return await requestAndDecode('/user/create', postReq(req), GenericResponse, accessToken);
}

export async function editUser(accessToken: string, req: EditUserRequestT) {
    return await requestAndDecode('/user/edit', postReq(req), GenericResponse, accessToken);
}

export async function getAllHabits(accessToken: string) {
    return await requestAndDecode('/habit/get/all', getReq(), GetAllHabitsResponse, accessToken);
}

export async function createHabit(accessToken: string, req: CreateHabitRequestT) {
    return await requestAndDecode('/habit/create', postReq(req), GenericResponse, accessToken);
}

export async function editHabit(accessToken: string, habitId: number, req: EditHabitRequestT) {
    return await requestAndDecode(`/habit/edit/${habitId}`, postReq(req), GenericResponse, accessToken);
}

export async function deleteHabit(accessToken: string, habitId: number) {
    return await requestAndDecode(`/habit/delete/${habitId}`, deleteReq(), GenericResponse, accessToken);
}

export async function createCompletion(accessToken: string, req: CreateCompletionRequestT) {
    return await requestAndDecode('/completion/create', postReq(req), GenericResponse, accessToken);
}

export async function getAllCompletions(accessToken: string, page?: number) {
    return await requestAndDecode(`/completion/get/all?page=${page ?? '0'}`, getReq(), GetAllCompletionsResponse, accessToken);
}

export async function getSomeCompletions(accessToken: string, habitId: number) {
    return await requestAndDecode(`/completion/get/${habitId}`, getReq(), GetSomeCompletionsResponse, accessToken);
}

export async function deleteCompletion(accessToken: string, habitId: number, completionId: number) {
    return await requestAndDecode(`/completion/delete/${habitId}/${completionId}`, deleteReq(), GenericResponse, accessToken);
}