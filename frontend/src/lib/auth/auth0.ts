import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { Endpoints } from "../api/endpoints";

export const auth0 = new Auth0Client({
    appBaseUrl: Endpoints.selfUrl,
    authorizationParameters: {
        scope: 'openid profile email habits',
        audience: 'habithero',
    }
});