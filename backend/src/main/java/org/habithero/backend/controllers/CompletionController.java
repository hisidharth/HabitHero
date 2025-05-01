package org.habithero.backend.controllers;

import org.habithero.backend.models.request.CreateCompletionRequest;
import org.habithero.backend.models.request.CreateHabitRequest;
import org.habithero.backend.models.response.GenericResponse;
import org.habithero.backend.repositories.CompletionRepository;
import org.habithero.backend.utils.JWTUtils;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/completion")
public class CompletionController {
    private CompletionRepository completionRepository;

    public CompletionController(CompletionRepository completionRepository) {
        this.completionRepository = completionRepository;
    }
    @PostMapping("/create")
    public GenericResponse create(final JwtAuthenticationToken jwt, @RequestBody CreateCompletionRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.completionRepository.create(userId, request.getHabitId());
        return new GenericResponse();
    }
}
