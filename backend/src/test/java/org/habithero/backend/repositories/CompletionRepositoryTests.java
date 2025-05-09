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
            // Test creating a new completion entry

    @Test
    void testCreateCompletion() {
        boolean result = this.completionRepository.create("test9", 15);
        assertThat(result).isTrue();
                // Define broad date range for retrieval

        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");
        // Retrieve and verify the created completion

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test9", 15, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(1);
    }

    @Test
    void testDeleteCompletion() {
                // Test deleting an existing completion

        boolean result = this.completionRepository.delete("test7", 11, 15);
        assertThat(result).isTrue();
        // Set broad range to confirm deletion result

        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");
        // Verify completion count after deletion

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test7", 11, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(9);
    }

    @Test
    void testGetSomeCompletions() {
                // Retrieve completions within a given period

        Timestamp startTimestamp = Timestamp.valueOf("2000-01-01 00:00:00.000000");
        Timestamp endTimestamp = Timestamp.valueOf("2100-01-01 00:00:00.000000");
        // Validate retrieval is successful and correct

        Pair<Habit, ArrayList<Completion>> habitAndCompletions = this.completionRepository.getSome("test1", 1, startTimestamp, endTimestamp);
        assertThat(habitAndCompletions).isNotNull();
        assertThat(habitAndCompletions.b).isNotNull();
        assertThat(habitAndCompletions.b.size()).isEqualTo(5);
    }
}
