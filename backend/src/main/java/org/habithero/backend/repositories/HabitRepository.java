package org.habithero.backend.repositories;

import org.habithero.backend.entities.Habit;
import org.habithero.backend.entities.User;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;

@Repository
public class HabitRepository {
    private final DataSource dataSource;
    public HabitRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean create(String userId, String habitName, int frequency, String category) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Habits (UserId, HabitName, Frequency, Category)" +
                            "VALUES (?, ?, ?, ?);"
            );

            stmt.setString(1, userId);
            stmt.setString(2, habitName);
            stmt.setInt(3, frequency);
            stmt.setString(4, category);

            stmt.executeUpdate();
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public boolean edit(String userId, int habitId, String habitName, int frequency, String category) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE Habits " +
                            "SET HabitName = ?, Frequency = ?, Category = ? " +
                            "WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, habitName);
            stmt.setInt(2, frequency);
            stmt.setString(3, category);
            stmt.setString(4, userId);
            stmt.setInt(5, habitId);

            if (stmt.executeUpdate() <= 0) {
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public boolean delete(String userId, int habitId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "DELETE FROM Habits " +
                            "WHERE UserID = ? AND HabitID = ?;"
            );

            stmt.setString(1, userId);
            stmt.setInt(2, habitId);

            if (stmt.executeUpdate() <= 0) {
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public ArrayList<Habit> getAll(String userId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Habits " +
                            "WHERE UserID = ?;"
            );

            stmt.setString(1, userId);

            ArrayList<Habit> habits = new ArrayList<>();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                habits.add(habitFromResultSet(rs));
            }

            return habits;
        } catch(SQLException e) {
            return null;
        }
    }

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
