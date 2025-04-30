package org.habithero.backend.controllers;

import org.habithero.backend.entities.User;
import org.habithero.backend.models.request.CreateUserRequest;
import org.habithero.backend.models.request.EditUserRequest;
import org.habithero.backend.models.response.GenericResponse;
import org.habithero.backend.models.response.GetUserResponse;
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
    public GenericResponse create(final JwtAuthenticationToken jwt, @RequestBody CreateUserRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.userRepository.create(userId, request.getUsername(), request.getEmail());
        return new GenericResponse();
    }

    @PostMapping("/edit")
    public GenericResponse edit(final JwtAuthenticationToken jwt, @RequestBody EditUserRequest request) {
        String userId = JWTUtils.userIdFromToken(jwt);
        this.userRepository.edit(userId, request.getUsername());
        return new GenericResponse();
    }

    @GetMapping("/me")
    public GetUserResponse get(final JwtAuthenticationToken jwt) {
        String userId = JWTUtils.userIdFromToken(jwt);
        return new GetUserResponse(this.userRepository.getById(userId));
    }
}
