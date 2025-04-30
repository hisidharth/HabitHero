package org.habithero.backend.controllers;

import org.habithero.backend.models.request.CreateHabitRequest;
import org.habithero.backend.models.request.CreateUserRequest;
import org.habithero.backend.models.request.EditHabitRequest;
import org.habithero.backend.models.request.EditUserRequest;
import org.habithero.backend.models.response.GenericResponse;
import org.habithero.backend.models.response.GetAllHabitsResponse;
import org.habithero.backend.models.response.GetUserResponse;
import org.habithero.backend.repositories.HabitRepository;
import org.habithero.backend.repositories.UserRepository;
import org.habithero.backend.utils.JWTUtils;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/habit")
public class HabitController {
    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    @PostMapping("/create")
    public GenericResponse create(final JwtAuthenticationToken jwt, @RequestBody CreateHabitRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.habitRepository.create(userId, request.getHabitName(), request.getFrequency(), request.getCategory());
        return new GenericResponse();
    }

    @PostMapping("/edit/{habitId}")
    public GenericResponse edit(final JwtAuthenticationToken jwt, @PathVariable int habitId, @RequestBody EditHabitRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.habitRepository.edit(userId, habitId, request.getHabitName(), request.getFrequency(), request.getCategory());
        return new GenericResponse();
    }

    @DeleteMapping("/delete/{habitId}")
    public GenericResponse delete(final JwtAuthenticationToken jwt, @PathVariable int habitId) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.habitRepository.delete(userId, habitId);
        return new GenericResponse();
    }

    @GetMapping("/all")
    public GetAllHabitsResponse getAll(final JwtAuthenticationToken jwt) {
        String userId = JWTUtils.userIdFromToken(jwt);
        return new GetAllHabitsResponse(this.habitRepository.getAll(userId));
    }
}
