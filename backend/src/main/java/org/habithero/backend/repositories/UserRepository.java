package org.habithero.backend.repositories;

import org.habithero.backend.entities.User;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;

@Repository
public class UserRepository {
    private final DataSource dataSource;

    public UserRepository(DataSource dataSource) {
        this.dataSource = dataSource; // Initialize database connection
    }

    // Create a new user
    public boolean create(String userId, String username, String email) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Users (UserId, Username, Email) VALUES (?, ?, ?);"
            );

            stmt.setString(1, userId);
            stmt.setString(2, username);
            stmt.setString(3, email);

            stmt.executeUpdate(); // Execute insert
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Edit the username of an existing user
    public boolean edit(String userId, String username) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE Users SET Username = ? WHERE UserID = ?;"
            );

            stmt.setString(1, username);
            stmt.setString(2, userId);

            if (stmt.executeUpdate() <= 0) { // Check update success
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Add XP to a user and potentially level them up
    public boolean addXp(String userId, int amount) {
        User user = getById(userId); // Retrieve user details
        if (user == null) {
            return false;
        }

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE Users SET XP = ?, CurrentLevel = ? WHERE UserID = ?;"
            );

            int newXp = (user.getXp() + amount) % 1000; // Calculate new XP
            int newLevel = (user.getXp() + amount >= 1000) ? user.getCurrentLevel() + 1 : user.getCurrentLevel(); // Level up if necessary

            stmt.setInt(1, newXp);
            stmt.setInt(2, newLevel);
            stmt.setString(3, userId);

            if (stmt.executeUpdate() <= 0) { // Check update success
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    // Retrieve user by ID
    public User getById(String userId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Users WHERE UserID = ?;"
            );

            stmt.setString(1, userId);

            ResultSet rs = stmt.executeQuery(); // Execute query
            if (!rs.next()) {
                return null; // No user found
            }

            return userFromResultSet(rs);
        } catch(SQLException e) {
            return null;
        }
    }

    // Helper method to convert ResultSet into User object
    private User userFromResultSet(ResultSet rs) throws SQLException {
        return new User(
                rs.getString("UserID"),
                rs.getString("Username"),
                rs.getString("Email"),
                rs.getInt("CurrentLevel"),
                rs.getInt("XP")
        );
    }
}
