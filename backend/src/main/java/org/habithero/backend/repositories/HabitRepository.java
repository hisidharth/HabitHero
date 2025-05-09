package org.habithero.backend.repositories;

import org.habithero.backend.entities.Habit;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;

@Repository
public class HabitRepository {
    private final DataSource dataSource;

    public HabitRepository(DataSource dataSource) {
        this.dataSource = dataSource; // Initialize database connection
    }

    // Create a new habit for the user
    public boolean create(String userId, String habitName, int frequency, String category) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Habits (UserId, HabitName, Frequency, Category) VALUES (?, ?, ?, ?);"
            );

            stmt.setString(1, userId);
            stmt.setString(2, habitName);
            stmt.setInt(3, frequency);
            stmt.setString(4, category);

            stmt.executeUpdate(); // Execute insert
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Edit an existing habit
    public boolean edit(String userId, int habitId, String habitName, int frequency, String category) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE Habits SET HabitName = ?, Frequency = ?, Category = ? WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, habitName);
            stmt.setInt(2, frequency);
            stmt.setString(3, category);
            stmt.setString(4, userId);
            stmt.setInt(5, habitId);

            if (stmt.executeUpdate() <= 0) { // Check if update was successful
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Delete a habit
    public boolean delete(String userId, int habitId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "DELETE FROM Habits WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);

            if (stmt.executeUpdate() <= 0) { // Check if deletion was successful
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Retrieve all habits for a user
    public ArrayList<Habit> getAll(String userId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Habits WHERE UserID = ?;"
            );

            stmt.setString(1, userId);

            ArrayList<Habit> habits = new ArrayList<>();

            ResultSet rs = stmt.executeQuery(); // Execute query
            while (rs.next()) {
                habits.add(habitFromResultSet(rs)); // Add habit to list
            }

            return habits;
        } catch(SQLException e) {
            return null;
        }
    }

    // Retrieve a habit by ID
    public Habit getById(String userId, int habitId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Habits WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);

            ResultSet rs = stmt.executeQuery(); // Execute query
            if (!rs.next()) {
                return null; // No habit found
            }

            return habitFromResultSet(rs);
        } catch(SQLException e) {
            return null;
        }
    }

    // Helper method to convert ResultSet into Habit object
    private Habit habitFromResultSet(ResultSet rs) throws SQLException {
        return new Habit(
                rs.getInt("HabitID"),
                rs.getString("UserID"),
                rs.getString("HabitName"),
                rs.getInt("Frequency"),
                rs.getString("Category")
        );
    }
}
