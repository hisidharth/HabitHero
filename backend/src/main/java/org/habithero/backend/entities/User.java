package org.habithero.backend.entities;

public class User {
    private String userId;
    private String username;
    private String email;
    private int currentLevel;
    private int xp;

    public User(String userId, String username, String email, int currentLevel, int xp) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.currentLevel = currentLevel;
        this.xp = xp;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(int currentLevel) {
        this.currentLevel = currentLevel;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }
}
