package org.habithero.backend.controllers;

import org.habithero.backend.entities.User;
import org.habithero.backend.models.CreateUserRequest;
import org.habithero.backend.repositories.UserRepository;
import org.habithero.backend.utils.JWTUtils;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public void create(final JwtAuthenticationToken jwt, @RequestBody CreateUserRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.userRepository.create(userId, request.getUsername(), request.getEmail());
    }

    @GetMapping("/me")
    public User get(final JwtAuthenticationToken jwt) {
        String userId = JWTUtils.userIdFromToken(jwt);
        return this.userRepository.getById(userId);
    }
}
