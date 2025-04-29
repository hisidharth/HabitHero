package org.habithero.backend.utils;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class JWTUtils {
    public static String userIdFromToken(final JwtAuthenticationToken token) {
        return token.getToken().getClaimAsString("sub");
    }
}
