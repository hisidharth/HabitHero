package org.habithero.backend.repositories;

import org.habithero.backend.entities.User;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;

@Repository
public class UserRepository {
    private final DataSource dataSource;
    public UserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean create(String userId, String username, String email) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "INSERT INTO Users (UserId, Username, Email)" +
                        "VALUES (?, ?, ?);"
            );

            stmt.setString(1, userId);
            stmt.setString(2, username);
            stmt.setString(3, email);

            stmt.executeUpdate();
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public boolean edit(String userId, String username) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "UPDATE Users " +
                            "SET Username = ?" +
                            "WHERE UserID = ?;"
            );

            stmt.setString(1, username);
            stmt.setString(2, userId);

            if (stmt.executeUpdate() <= 0) {
                return false;
            }
        } catch(SQLException e) {
            return false;
        }

        return true;
    }

    public User getById(String userId) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM Users " +
                        "WHERE UserID = ?;"
            );

            stmt.setString(1, userId);

            ResultSet rs = stmt.executeQuery();
            if (!rs.next()) {
                System.out.println("not found");
                return null;
            }

            return userFromResultSet(rs);
        } catch(SQLException e) {
            return null;
        }
    }

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
