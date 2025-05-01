package org.habithero.backend.repositories;

import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class CompletionRepository {
    private final DataSource dataSource;
    private final HabitRepository habitRepository;
    public CompletionRepository(DataSource dataSource, HabitRepository habitRepository) {
        this.dataSource = dataSource;
        this.habitRepository = habitRepository;
    }
    public boolean create(String userId, int habitId) {
        try (Connection conn = dataSource.getConnection()) {
            // ensure habit is owned by user
            if (this.habitRepository.getById(userId, habitId) == null) {
                return false;
            }

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Completions (HabitID, UserID)" +
                            "VALUES (?, ?);"
            );

            stmt.setInt(1, habitId);
            stmt.setString(2, userId);

            stmt.executeUpdate();
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
