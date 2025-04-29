package org.habithero.backend.models.response;

public class GenericResponse {
    private boolean success;

    public GenericResponse() {
        this.success = true;
    }

    public GenericResponse(boolean success) {
        this.success = success;
    }

    public boolean getSuccess() {
        return this.success;
    }
}
