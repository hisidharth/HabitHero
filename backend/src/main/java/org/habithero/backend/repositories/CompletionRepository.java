package org.habithero.backend.repositories;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;
import org.habithero.backend.utils.Pair;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
                    "INSERT INTO Completions (HabitID, UserID, XPEarned)" +
                            "VALUES (?, ?, 100);"
            );

            stmt.setInt(1, habitId);
            stmt.setString(2, userId);

            stmt.executeUpdate();
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public boolean delete(String userId, int habitId, int completionId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "DELETE FROM Completions " +
                            "WHERE UserID = ? AND HabitID = ? AND CompletionID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);
            stmt.setInt(3, completionId);

            if (stmt.executeUpdate() <= 0) {
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public Pair<ArrayList<Habit>, Map<Integer, ArrayList<Completion>>> getAll(String userId, Timestamp startTimestamp, Timestamp endTimestamp) {
        Map<Integer, ArrayList<Completion>> completions = new HashMap<>();

        ArrayList<Habit> habits = this.habitRepository.getAll(userId);
        if (habits == null) {
            return null;
        }

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Completions " +
                            "WHERE Completions.UserID = ? AND Completions.TimeCompleted BETWEEN ? AND ?;"
            );

            stmt.setString(1, userId);
            stmt.setTimestamp(2, startTimestamp);
            stmt.setTimestamp(3, endTimestamp);

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                int habitId = rs.getInt("HabitID");

                completions
                        .computeIfAbsent(habitId, k -> new ArrayList<>())
                        .add(completionFromResultSet(rs));
            }
        } catch(SQLException e) {
            return null;
        }

        return new Pair<>(habits, completions);
    }

    public Pair<Habit, ArrayList<Completion>> getSome(String userId, int habitId) {
        ArrayList<Completion> completions = new ArrayList<>();

        Habit habit = this.habitRepository.getById(userId, habitId);
        if (habit == null) {
            return null;
        }

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Completions " +
                            "WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                completions.add(completionFromResultSet(rs));
            }
        } catch(SQLException e) {
            return null;
        }

        return new Pair<>(habit, completions);
    }

    public Completion completionFromResultSet(ResultSet rs) throws SQLException {
        return new Completion(
                rs.getInt("CompletionID"),
                rs.getInt("HabitID"),
                rs.getString("UserID"),
                rs.getTimestamp("TimeCompleted"),
                rs.getInt("XPEarned")
        );
    }
}
