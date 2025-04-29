package org.habithero.backend.models.response;

import org.habithero.backend.entities.User;

public class GetUserResponse {
    private User user;
    public GetUserResponse(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
