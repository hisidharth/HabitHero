import { isLeft } from 'fp-ts/lib/Either.js';
import t from 'io-ts';

export const getReq = (): RequestInit => ({
    method: 'get'
});

export const postReq = <T>(data: T): RequestInit => ({
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const deleteReq = (): RequestInit => ({
    method: 'delete',
});

export function cast<I, A>(codec: t.Decoder<I, A>): (value: I) => A {
    return (value: I) => {
        const decoded = codec.decode(value);
        if (isLeft(decoded)) {
            throw new Error('failed to decode');
        }

        return decoded.right;
    }
}