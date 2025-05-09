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
    private final UserRepository userRepository;

    public CompletionRepository(DataSource dataSource, HabitRepository habitRepository, UserRepository userRepository) {
        this.dataSource = dataSource; // Initialize database connection
        this.habitRepository = habitRepository; // Access habits from DB
        this.userRepository = userRepository; // Access users from DB
    }

    // Create a completion entry and add XP to the user
    public boolean create(String userId, int habitId) {
        if (!this.userRepository.addXp(userId, 100)) { // Add XP to user
            return false;
        }

        try (Connection conn = dataSource.getConnection()) {
            if (this.habitRepository.getById(userId, habitId) == null) { // Validate habit ownership
                return false;
            }

            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Completions (HabitID, UserID, XPEarned) VALUES (?, ?, 100);"
            );

            stmt.setInt(1, habitId);
            stmt.setString(2, userId);

            stmt.executeUpdate(); // Execute insert statement
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Delete a specific completion entry
    public boolean delete(String userId, int habitId, int completionId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "DELETE FROM Completions WHERE UserID = ? AND HabitID = ? AND CompletionID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);
            stmt.setInt(3, completionId);

            if (stmt.executeUpdate() <= 0) { // Check if delete was successful
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Retrieve all completions for a user within a time period
    public Pair<ArrayList<Habit>, Map<Integer, ArrayList<Completion>>> getAll(String userId, Timestamp startTimestamp, Timestamp endTimestamp) {
        Map<Integer, ArrayList<Completion>> completions = new HashMap<>();

        ArrayList<Habit> habits = this.habitRepository.getAll(userId); // Get user habits
        if (habits == null) {
            return null;
        }

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Completions WHERE Completions.UserID = ? AND Completions.TimeCompleted BETWEEN ? AND ?;"
            );

            stmt.setString(1, userId);
            stmt.setTimestamp(2, startTimestamp);
            stmt.setTimestamp(3, endTimestamp);

            ResultSet rs = stmt.executeQuery(); // Execute query
            while (rs.next()) {
                int habitId = rs.getInt("HabitID");

                completions
                        .computeIfAbsent(habitId, k -> new ArrayList<>()) // Group completions by habit
                        .add(completionFromResultSet(rs));
            }
        } catch(SQLException e) {
            return null;
        }

        return new Pair<>(habits, completions);
    }

    // Retrieve completions for a specific habit within a time period
    public Pair<Habit, ArrayList<Completion>> getSome(String userId, int habitId, Timestamp startTimestamp, Timestamp endTimestamp) {
        ArrayList<Completion> completions = new ArrayList<>();

        Habit habit = this.habitRepository.getById(userId, habitId); // Validate habit
        if (habit == null) {
            return null;
        }

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Completions WHERE UserID = ? AND HabitID = ? AND Completions.TimeCompleted BETWEEN ? AND ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);
            stmt.setTimestamp(3, startTimestamp);
            stmt.setTimestamp(4, endTimestamp);

            ResultSet rs = stmt.executeQuery(); // Execute query

            while (rs.next()) {
                completions.add(completionFromResultSet(rs)); // Add completion to list
            }
        } catch(SQLException e) {
            return null;
        }

        return new Pair<>(habit, completions);
    }

    // Helper method to convert ResultSet to Completion object
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
