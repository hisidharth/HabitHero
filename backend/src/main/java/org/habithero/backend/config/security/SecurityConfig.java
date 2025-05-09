package org.habithero.backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    // Configure the security filter chain

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
    // Define authorization rules

                .authorizeHttpRequests(((authorize) -> authorize
                        .anyRequest().hasAuthority("SCOPE_habits")) // Require 'habits' scope for all endpoints
                )
                .cors(Customizer.withDefaults()) // Enable default CORS settings
                .oauth2ResourceServer((oauth2) -> oauth2
                        .jwt(Customizer.withDefaults())) // Configure JWT authentication
                .build();
    }
}
