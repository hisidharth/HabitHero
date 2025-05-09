package org.habithero.backend.repositories;

import org.habithero.backend.entities.Habit;
import org.habithero.backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class HabitRepositoryTests {
    @Autowired
    private HabitRepository habitRepository;

    @Test
    void testCreateHabit() {
                // Test habit creation with specified details

        boolean result = this.habitRepository.create("test15", "TEST HABIT CREATE", 7, "Test");
        assertThat(result).isTrue();
        // Verify newly created habit exists

        Habit habit = this.habitRepository.getById("test15", 16);
        assertThat(habit).isNotNull();
        assertThat(habit.getHabitName()).isEqualTo("TEST HABIT CREATE");
    }

    @Test
    void testEditHabit() {
                // Test editing existing habit

        boolean result = this.habitRepository.edit("test1", 5, "TEST HABIT EDIT", 7, "Test");
        assertThat(result).isTrue();
        // Confirm the habit was updated correctly

        Habit habit = this.habitRepository.getById("test1", 5);
        assertThat(habit).isNotNull();
        assertThat(habit.getHabitName()).isEqualTo("TEST HABIT EDIT");
    }

    @Test
    void testDeleteHabit() {
                // Test deletion of a habit

        boolean result = this.habitRepository.delete("test1", 2);
        assertThat(result).isTrue();
        // Confirm habit no longer exists

        Habit habit = this.habitRepository.getById("test1", 2);
        assertThat(habit).isNull();
    }

    @Test
    void testGetAllHabits() {
                // Test retrieval of all habits for a user

        ArrayList<Habit> result = this.habitRepository.getAll("test7");
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(2);
    }
}
