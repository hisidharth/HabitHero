import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { redirect } from "next/navigation";
import { Endpoints } from './endpoints';

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