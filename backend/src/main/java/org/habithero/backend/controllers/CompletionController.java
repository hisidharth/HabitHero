package org.habithero.backend.controllers;

import org.habithero.backend.models.request.CreateCompletionRequest;
import org.habithero.backend.models.request.CreateHabitRequest;
import org.habithero.backend.models.response.GenericResponse;
import org.habithero.backend.models.response.GetAllCompletionsResponse;
import org.habithero.backend.models.response.GetSomeCompletionsResponse;
import org.habithero.backend.repositories.CompletionRepository;
import org.habithero.backend.utils.JWTUtils;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.ZonedDateTime;

@RestController
@RequestMapping("/completion")
public class CompletionController {
    private final CompletionRepository completionRepository;

    public CompletionController(CompletionRepository completionRepository) {
        this.completionRepository = completionRepository;
    }
    @PostMapping("/create")
    public GenericResponse create(final JwtAuthenticationToken jwt, @RequestBody CreateCompletionRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.completionRepository.create(userId, request.getHabitId());
        return new GenericResponse(true);
    }

    @DeleteMapping("/delete/{habitId}/{completionId}")
    public GenericResponse delete(final JwtAuthenticationToken jwt, @PathVariable int habitId, @PathVariable int completionId) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.completionRepository.delete(userId, habitId, completionId);
        return new GenericResponse(true);
    }

    @GetMapping("/get/all")
    public GetAllCompletionsResponse getAll(final JwtAuthenticationToken jwt, @RequestParam int page) {
        String userId = JWTUtils.userIdFromToken(jwt);
        var res = this.completionRepository.getAll(userId, page);
        return new GetAllCompletionsResponse(
                Timestamp.from(ZonedDateTime.now().toInstant()),
                Timestamp.from(ZonedDateTime.now().toInstant()),
                res.a,
                res.b
        );
    }

    @GetMapping("/get/{habitId}")
    public GetSomeCompletionsResponse getSome(final JwtAuthenticationToken jwt, @PathVariable int habitId) {
        String userId = JWTUtils.userIdFromToken(jwt);
        var res = this.completionRepository.getSome(userId, habitId);
        return new GetSomeCompletionsResponse(res.a, res.b);
    }
}
