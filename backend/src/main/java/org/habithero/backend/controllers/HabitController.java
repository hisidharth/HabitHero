package org.habithero.backend.controllers;

import org.habithero.backend.models.request.CreateHabitRequest;
import org.habithero.backend.models.request.EditHabitRequest;
import org.habithero.backend.models.response.GenericResponse;
import org.habithero.backend.models.response.GetAllHabitsResponse;
import org.habithero.backend.repositories.HabitRepository;
import org.habithero.backend.utils.JWTUtils;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/habit") // Base URL for habit-related endpoints
public class HabitController {
    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository; // Inject HabitRepository dependency
    }

    // Endpoint to create a new habit
    @PostMapping("/create")
    public GenericResponse create(final JwtAuthenticationToken jwt, @RequestBody CreateHabitRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt); // Extract user ID from JWT
        this.habitRepository.create(userId, request.getHabitName(), request.getFrequency(), request.getCategory());
        return new GenericResponse(true); // Indicate success
    }

    // Endpoint to edit an existing habit by habit ID
    @PostMapping("/edit/{habitId}")
    public GenericResponse edit(final JwtAuthenticationToken jwt, @PathVariable int habitId, @RequestBody EditHabitRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt); // Extract user ID from JWT
        this.habitRepository.edit(userId, habitId, request.getHabitName(), request.getFrequency(), request.getCategory());
        return new GenericResponse(true); // Indicate success
    }

    // Endpoint to delete a habit by habit ID
    @DeleteMapping("/delete/{habitId}")
    public GenericResponse delete(final JwtAuthenticationToken jwt, @PathVariable int habitId) {
        String userId = JWTUtils.userIdFromToken(jwt); // Extract user ID from JWT
        this.habitRepository.delete(userId, habitId);
        return new GenericResponse(true); // Indicate success
    }

    // Endpoint to retrieve all habits for the authenticated user
    @GetMapping("/get/all")
    public GetAllHabitsResponse getAll(final JwtAuthenticationToken jwt) {
        String userId = JWTUtils.userIdFromToken(jwt); // Extract user ID from JWT
        return new GetAllHabitsResponse(this.habitRepository.getAll(userId)); // Return list of habits
    }
}
