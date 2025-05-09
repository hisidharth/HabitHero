package org.habithero.backend.repositories;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;
import org.habithero.backend.utils.Pair;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CompletionRepositoryTests {
    @Autowired
    private CompletionRepository completionRepository;

    @Test
    void testCreateCompletion() {
        boolean result = this.completionRepository.create("test9", 15);
        assertThat(result).isTrue();

        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test9", 15, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(1);
    }

    @Test
    void testDeleteCompletion() {
        boolean result = this.completionRepository.delete("test7", 11, 15);
        assertThat(result).isTrue();

        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test7", 11, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(9);
    }

    @Test
    void testGetSomeCompletions() {
        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test1", 1, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(5);
    }
}
