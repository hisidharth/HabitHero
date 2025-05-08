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
        boolean result = this.habitRepository.create("test15", "TEST HABIT CREATE", 7, "Test");
        assertThat(result).isTrue();

        Habit habit = this.habitRepository.getById("test15", 16);
        assertThat(habit).isNotNull();
        assertThat(habit.getHabitName()).isEqualTo("TEST HABIT CREATE");
    }

    @Test
    void testEditHabit() {
        boolean result = this.habitRepository.edit("test1", 5, "TEST HABIT EDIT", 7, "Test");
        assertThat(result).isTrue();

        Habit habit = this.habitRepository.getById("test1", 5);
        assertThat(habit).isNotNull();
        assertThat(habit.getHabitName()).isEqualTo("TEST HABIT EDIT");
    }

    @Test
    void testDeleteHabit() {
        boolean result = this.habitRepository.delete("test1", 2);
        assertThat(result).isTrue();

        Habit habit = this.habitRepository.getById("test1", 2);
        assertThat(habit).isNull();
    }

    @Test
    void testGetAllHabits() {
        ArrayList<Habit> result = this.habitRepository.getAll("test7");
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(2);
    }
}
