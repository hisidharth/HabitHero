package org.habithero.backend.repositories;

import org.habithero.backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    @Test
    void testCreateUser() {
                // Test user creation functionality

        boolean result = this.userRepository.create("testCreateUser_test_user", "TEST USER", "testCreateUser_test_user@example.com");
        assertThat(result).isTrue();
        // Verify user was successfully created

        User user = this.userRepository.getById("testCreateUser_test_user");
        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo("testCreateUser_test_user@example.com");
    }

    @Test
    void testEditUser() {
                // Test updating user's username

        boolean result = this.userRepository.edit("test2", "TEST USER EDIT");
        assertThat(result).isTrue();
        // Confirm username update

        User user = this.userRepository.getById("test2");
        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("TEST USER EDIT");
    }

    @Test
    void testGetUser() {
                // Test retrieving an existing user
        User user = this.userRepository.getById("test1");
        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo("test1@example.com");
    }
}
